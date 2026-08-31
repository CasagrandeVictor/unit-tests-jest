const PersonagemRPG = require('../src/personagemRPG');

describe('Testes da classe PersonagemRPG', () => {
    let personagem;

    beforeEach(() => {
        personagem = new PersonagemRPG('Aragorn', 100);
    });

    describe('constructor', () => {
        test('Deve criar um personagem com nome, vida e valores iniciais corretos', () => {
            expect(personagem.nome).toBe('Aragorn');
            expect(personagem.vidaMaxima).toBe(100);
            expect(personagem.vida).toBe(100);
            expect(personagem.nivel).toBe(1);
            expect(personagem.experiencia).toBe(0);
            expect(personagem.ouro).toBe(0);
            expect(personagem.inventario).toEqual([]);
            expect(personagem.armaEquipada).toBeNull();
        });

        test('Deve lançar erro ao criar personagem sem nome', () => {
            expect(() => new PersonagemRPG('')).toThrow('O nome do personagem é obrigatório');
        });

        test('Deve usar 100 como vida máxima padrão quando não informada', () => {
            const p = new PersonagemRPG('Legolas');
            expect(p.vidaMaxima).toBe(100);
            expect(p.vida).toBe(100);
        });
    });

    describe('receberDano', () => {
        test('Deve reduzir a vida do personagem pelo valor do dano, sem ficar negativa', () => {
            expect(personagem.receberDano(30)).toBe(70);
            expect(personagem.receberDano(150)).toBe(0);
        });

        test('Deve lançar erro ao receber dano negativo', () => {
            expect(() => personagem.receberDano(-10)).toThrow('O dano não pode ser negativo');
        });
    });

    describe('curar', () => {
        test('Deve aumentar a vida sem ultrapassar a vida máxima', () => {
            personagem.receberDano(50);
            expect(personagem.curar(20)).toBe(70);
            expect(personagem.curar(1000)).toBe(personagem.vidaMaxima);
        });

        test('Deve lançar erro ao curar com quantidade negativa', () => {
            expect(() => personagem.curar(-5)).toThrow('A cura não pode ser negativa');
        });
    });

    describe('estaVivo / estaMorto', () => {
        test('Deve refletir corretamente o estado vivo/morto do personagem', () => {
            expect(personagem.estaVivo()).toBe(true);
            expect(personagem.estaMorto()).toBe(false);

            personagem.receberDano(100);

            expect(personagem.estaVivo()).toBe(false);
            expect(personagem.estaMorto()).toBe(true);
        });
    });

    describe('xpParaProximoNivel', () => {
        test('Deve retornar o xp necessário proporcional ao nível atual', () => {
            expect(personagem.xpParaProximoNivel()).toBe(100);
            personagem.subirNivel();
            expect(personagem.xpParaProximoNivel()).toBe(200);
        });
    });

    describe('ganharExperiencia', () => {
        test('Deve acumular experiência e subir de nível ao atingir o limite', () => {
            expect(personagem.ganharExperiencia(50)).toBe(50);
            expect(personagem.nivel).toBe(1);

            personagem.ganharExperiencia(50);
            expect(personagem.nivel).toBe(2);
            expect(personagem.experiencia).toBe(0);
        });

        test('Deve lançar erro ao ganhar experiência negativa', () => {
            expect(() => personagem.ganharExperiencia(-10)).toThrow('A experiência não pode ser negativa');
        });

        test('Deve subir múltiplos níveis quando ganha muita experiência de uma vez', () => {
            personagem.ganharExperiencia(300);
            expect(personagem.nivel).toBe(3);
        });
    });

    describe('subirNivel', () => {
        test('Deve aumentar o nível, a vida máxima em 20 e restaurar a vida ao máximo', () => {
            personagem.receberDano(50);
            const nivel = personagem.subirNivel();
            expect(nivel).toBe(2);
            expect(personagem.vidaMaxima).toBe(120);
            expect(personagem.vida).toBe(120);
        });
    });

    describe('inventário (adicionarItem, removerItem, possuiItem, contarItens, limparInventario)', () => {
        test('Deve adicionar, contar, verificar e remover itens do inventário', () => {
            personagem.adicionarItem('Espada');
            personagem.adicionarItem('Escudo');
            expect(personagem.inventario).toEqual(['Espada', 'Escudo']);
            expect(personagem.possuiItem('Espada')).toBe(true);
            expect(personagem.contarItens()).toBe(2);

            personagem.removerItem('Espada');
            expect(personagem.inventario).toEqual(['Escudo']);

            personagem.limparInventario();
            expect(personagem.inventario).toEqual([]);
        });

        test('Deve lançar erro ao tentar remover item inexistente', () => {
            expect(() => personagem.removerItem('Escudo')).toThrow('Item não encontrado no inventário');
        });
    });

    describe('ouro (ganharOuro, gastarOuro)', () => {
        test('Deve ganhar e gastar ouro corretamente', () => {
            personagem.ganharOuro(100);
            expect(personagem.gastarOuro(40)).toBe(60);
        });

        test('Deve lançar erro ao gastar mais ouro do que o disponível', () => {
            personagem.ganharOuro(10);
            expect(() => personagem.gastarOuro(50)).toThrow('Ouro insuficiente');
        });
    });

    describe('arma (equiparArma, desequiparArma) e atacar', () => {
        test('Deve equipar/desequipar arma e causar dano correspondente ao atacar', () => {
            const alvo = new PersonagemRPG('Golem', 100);
            const arma = { nome: 'Machado', dano: 25 };

            personagem.equiparArma(arma);
            expect(personagem.armaEquipada).toEqual(arma);

            personagem.atacar(alvo);
            expect(alvo.vida).toBe(75);

            personagem.desequiparArma();
            expect(personagem.armaEquipada).toBeNull();
        });
    });

    describe('percentualVida', () => {
        test('Deve retornar o percentual correto de vida', () => {
            expect(personagem.percentualVida()).toBe(100);
            personagem.receberDano(25);
            expect(personagem.percentualVida()).toBe(75);
        });
    });

    describe('resetar', () => {
        test('Deve restaurar a vida do personagem para o valor máximo', () => {
            personagem.receberDano(80);
            personagem.resetar();
            expect(personagem.vida).toBe(personagem.vidaMaxima);
        });
    });

    describe('status', () => {
        test('Deve retornar um resumo com os dados atuais do personagem', () => {
            personagem.ganharOuro(30);
            personagem.receberDano(10);
            expect(personagem.status()).toEqual({
                nome: 'Aragorn',
                vida: 90,
                vidaMaxima: 100,
                nivel: 1,
                experiencia: 0,
                ouro: 30,
                vivo: true,
            });
        });

        test('Deve refletir vivo como false quando o personagem está morto', () => {
            personagem.receberDano(100);
            expect(personagem.status().vivo).toBe(false);
        });
    });
});
