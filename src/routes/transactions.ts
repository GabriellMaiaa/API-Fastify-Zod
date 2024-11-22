import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

// Aqui estamos fazendo um plugin, ao dividir as nossas rotas para tudo nao ficar em server
// Os plugins sao sempre funções assíncronas

// O que são COOKIES? São formas de nós conseguirmos manter contexto entre requisições, muito usados em redes sociais
// Eles salvam um id para a pessoa baseado no login dela, e o histórico dela é salvo

export async function transactionsRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    // O body é onde é retornado as informações de criação e edição, é no body que são preenchidos
    //Aqui quero buscar 3 valores, o {title, amount, e o type da transação(credit or debit)}
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    let sessionId = request.cookies.sessionId; //Aqui estou buscando os valores dos cookies por meio da nossa req, após ter baixado a lib. E criamos o valor sessionId
    if (!sessionId) {
      sessionId = randomUUID(); // Se não tiver um valor de sessionId, crie um randômico

      reply.cookie("sessionId", sessionId, {
        path: "/", // E nossos cookies vão ser para todas as rotas de transactions
        maxAge: 60 * 60 * 24 * 7, // 7 dias a duração do cookie das informações do usuário. Esta em segundos
      });
    }

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId,
    });
    return reply.status(201).send();
  });

  app.delete(
    "/:id",
    {
      preHandler: [checkSessionIdExists], // Aqui estou adicinando o meu midlleware que faz a verificação se sexiste o session id com os COOKIES do usuário
    },
    async (request, reply) => {
      const deleteTransactionParamsSchema = z.object({
        id: z.string().uuid(), // O ID precisa ser um UUID válido
      });

      const { id } = deleteTransactionParamsSchema.parse(request.params);

      const deletedRows = await knex("transactions").del();

      if (deletedRows === 0) {
        return reply
          .status(404)
          .send({ error: "Transaction not found or unauthorized" });
      }

      return reply
        .status(200)
        .send({ message: "Transaction deleted successfully" });
    }
  );

  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists], // Aqui estou adicinando o meu midlleware que faz a verificação se sexiste o session id com os COOKIES do usuário
    },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const transactions = await knex("transactions")
        .select()
        .where("session_id", sessionId);

      return transactions; //VocÊ pode enviar dessa forma ou assim { transactions }, e assi é enviado em forma de objeto melhor pro frontend
      // reply.status(200).send("Your get has been sucessfully called");
    }
  );

  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists], // Aqui estou adicinando o meu midlleware que faz a verificação se sexiste o session id com os COOKIES do usuário
    },
    async (request, reply) => {
      const getTransactionsParamsSchema = z.object({
        //Aqui estou setando um tipo para o schema do parametro id que vai ser retornado
        id: z.string(),
      });

      const { id } = getTransactionsParamsSchema.parse(request.params); //Aqui faço o destructuring de somente o id para retornar dos params
      const { sessionId } = request.cookies;

      const transactions = await knex("transactions")
        .where({
          session_id: sessionId,
          id: id,
        })
        .first(); //E faço minha query de onde somente for o id
      return { transactions };
    }
  );

  app.get(
    "/summary",
    {
      preHandler: [checkSessionIdExists], // Aqui estou adicinando o meu midlleware que faz a verificação se sexiste o session id com os COOKIES do usuário
    },
    async (request, reply) => {
      const { sessionId } = request.cookies;
      // Aqui vai retornar a soma de todos os valores em amount
      const summary = await knex("transactions")
        .sum("amount", { as: "amount" })
        .where("session_id", sessionId)
        .first();
      return summary;
    }
  );
}

//Sempre numa requisição de POST, precisamos definir o schema/model do objeto que será salvo, e assim teremos a consistencia e o envio correto
