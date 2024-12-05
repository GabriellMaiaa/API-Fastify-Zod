import { app } from "./app";
import { env } from "./env";

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("Server is running");
  });
// Vamos usar o Knex que é um query builder, cria queries com codigo
//Parei na aula 2 - do banco de dados
