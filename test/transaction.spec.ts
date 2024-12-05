import { expect, beforeAll, afterAll, it } from "vitest";
import { app } from "../src/app"; // Vamos importar o nosso app que tem as config dele e não sobe um servidor
import request from "supertest";
import { describe } from "node:test";

// Como nossas ROTAS e PLUGINS são Assíncronos, com operações de bancos e outras edições, precisamos deixar claro para nossos testes que a operação
// já começou e quando deve ser concluída, para que o nosso valor de APP seja válido, e para isso usamos duas funções:

describe("Transactions Routes", () => {
  // Aqui estou descrevendo o que estou fazendo e criando um CONTEXTO
  beforeAll(async () => {
    //Aqui falo que o nosso App antes de tudo já esteja pronto
    await app.ready();
  });

  afterAll(async () => {
    //Remover a aplicação da memória, fecha-la
    await app.close();
  });

  it("should be able to create a Transaction Post", async () => {
    // Sempre FUNÇÕES ASSÍNCRONAS
    await request(app.server) //Sempre chamo nosso servidor dessa forma com o SERVER do node
      .post("/transactions") // O PATH da rota
      .send({
        title: "Teste", // Mandando o objeto
        amount: 5000,
        type: "credit",
      })
      .expect(201); // E no final, SEMPRE devemos ter o expect do nosso teste
  });

  it("should be able to list all transactions", async () => {});
});
