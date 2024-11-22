// O typescript é um superset do js tipado
//Que quando for subir o js precisa de um file ts que converte o js. Pq o Node nao entende ts
// E para nao precisar criar o file js para rodar o server, instalamos o tsx.
import fastify from "fastify";
import { knex } from "./database";
import cookie from "@fastify/cookie";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";

const app = fastify();

// npm i @fastify/cookie - vamos usar os cookies do fastify

app.register(cookie);

app.register(transactionsRoutes, {
  prefix: "transactions", //Aqui mostramos que todas as rotas desse plugin vem com o prefix transactions
}); //Chamada do plugin
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("Server is running");
  });
// Vamos usar o Knex que é um query builder, cria queries com codigo
//Parei na aula 2 - do banco de dados
