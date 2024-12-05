// O typescript é um superset do js tipado
//Que quando for subir o js precisa de um file ts que converte o js. Pq o Node nao entende ts
// E para nao precisar criar o file js para rodar o server, instalamos o tsx.
import fastify from "fastify";
import { knex } from "./database";
import cookie from "@fastify/cookie";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";

export const app = fastify();

// npm i @fastify/cookie - vamos usar os cookies do fastify

app.register(cookie);

app.register(transactionsRoutes, {
  prefix: "transactions", //Aqui mostramos que todas as rotas desse plugin vem com o prefix transactions
}); //Chamada do plugin

//Criamos aqui esse file app só para ficar as nossas configurações do app(servidor), e tbm para que o nossos testes não precisem subir o servidor
// devido ao listen não estar aqui
