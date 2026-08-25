class PersonagemRPG {
  constructor(nome, vidaMaxima = 100) {
    if (!nome || nome.trim() === "") {
      throw new Error("O nome do personagem é obrigatório");
    }
    this.nome = nome;
    this.vidaMaxima = vidaMaxima;
    this.vida = vidaMaxima;
    this.nivel = 1;
    this.experiencia = 0;
    this.ouro = 0;
    this.inventario = [];
    this.armaEquipada = null;
  }

  /** Reduz a vida do personagem, sem deixar ficar negativa */
  receberDano(dano) {
    if (dano < 0) {
      throw new Error("O dano não pode ser negativo");
    }
    this.vida = Math.max(0, this.vida - dano);
    return this.vida;
  }

  /** Aumenta a vida do personagem, sem ultrapassar a vida máxima */
  curar(quantidade) {
    if (quantidade < 0) {
      throw new Error("A cura não pode ser negativa");
    }
    this.vida = Math.min(this.vidaMaxima, this.vida + quantidade);
    return this.vida;
  }

  /** Verifica se o personagem ainda está vivo */
  estaVivo() {
    return this.vida > 0;
  }

  /** Verifica se o personagem está morto */
  estaMorto() {
    return this.vida <= 0;
  }

  /** Calcula a experiência necessária para o próximo nível */
  xpParaProximoNivel() {
    return this.nivel * 100;
  }

  /** Adiciona experiência, subindo de nível automaticamente quando necessário */
  ganharExperiencia(xp) {
    if (xp < 0) {
      throw new Error("A experiência não pode ser negativa");
    }
    this.experiencia += xp;
    while (this.experiencia >= this.xpParaProximoNivel()) {
      this.experiencia -= this.xpParaProximoNivel();
      this.subirNivel();
    }
    return this.experiencia;
  }

  /** Sobe um nível manualmente, aumentando a vida máxima e restaurando a vida */
  subirNivel() {
    this.nivel += 1;
    this.vidaMaxima += 20;
    this.vida = this.vidaMaxima;
    return this.nivel;
  }

  /** Adiciona um item ao inventário */
  adicionarItem(item) {
    this.inventario.push(item);
    return this.inventario;
  }

  /** Remove um item do inventário */
  removerItem(item) {
    const index = this.inventario.indexOf(item);
    if (index === -1) {
      throw new Error("Item não encontrado no inventário");
    }
    this.inventario.splice(index, 1);
  }

  /** Verifica se o personagem possui um determinado item */
  possuiItem(item) {
    return this.inventario.includes(item);
  }

  /** Conta quantos itens existem no inventário */
  contarItens() {
    return this.inventario.length;
  }

  /** Remove todos os itens do inventário */
  limparInventario() {
    this.inventario = [];
  }

  /** Adiciona ouro ao personagem */
  ganharOuro(quantidade) {
    if (quantidade < 0) {
      throw new Error("A quantidade de ouro não pode ser negativa");
    }
    this.ouro += quantidade;
    return this.ouro;
  }

  /** Gasta ouro do personagem, lançando erro se o saldo for insuficiente */
  gastarOuro(quantidade) {
    if (quantidade > this.ouro) {
      throw new Error("Ouro insuficiente");
    }
    this.ouro -= quantidade;
    return this.ouro;
  }

  /** Equipa uma arma (objeto com propriedade dano) */
  equiparArma(arma) {
    this.armaEquipada = arma;
    return this.armaEquipada;
  }

  /** Remove a arma equipada */
  desequiparArma() {
    this.armaEquipada = null;
  }

  /** Ataca outro personagem, causando dano com base na arma equipada */
  atacar(alvo) {
    const dano = this.armaEquipada ? this.armaEquipada.dano : 5;
    return alvo.receberDano(dano);
  }

  /** Calcula o percentual de vida atual em relação à vida máxima */
  percentualVida() {
    return Math.round((this.vida / this.vidaMaxima) * 100);
  }

  /** Restaura a vida do personagem para o valor máximo */
  resetar() {
    this.vida = this.vidaMaxima;
  }

  /** Retorna um resumo com o status atual do personagem */
  status() {
    return {
      nome: this.nome,
      vida: this.vida,
      vidaMaxima: this.vidaMaxima,
      nivel: this.nivel,
      experiencia: this.experiencia,
      ouro: this.ouro,
      vivo: this.estaVivo(),
    };
  }
}

module.exports = PersonagemRPG;
