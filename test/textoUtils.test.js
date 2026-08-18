const Utilitarios = require("../src/utilitarios");

describe("utilitarios", () => {
  test("String invertida", () => {
 // Arrange
    const util = new Utilitarios();
// Act
    const invertida = util.inverterString("abc");
// Assert
    expect(invertida).toBe("cbaa");
});

test("Verifica se uma string é um palíndromo", () => {
 // Arrange
    const util = new Utilitarios();
// Act
    const palindromo = util.ehPalindromo("Ame a ema");
// Assert
    expect(palindromo).toBe(true);
});

test("Deixa a primeira letra de cada palavra maiúscula", () => {
 // Arrange
    const util = new Utilitarios();
// Act
    const primeiraMaiuscula = util.primeiraLetraMaiuscula("maria");
// Assert
    expect(primeiraMaiuscula).toBe("Maria");
});

//test("Conta quantas vezes uma substring aparece no texto", () => {
 // Arrange
    //const util = new Utilitarios();
// Act
   // const primeiraMaiuscula = util.primeiraLetraMaiuscula("maria");
// Assert
   // expect(primeiraMaiuscula).toBe("Maria");
//});


});
