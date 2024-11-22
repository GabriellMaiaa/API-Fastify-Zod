import { knex as setupKnex, Knex } from "knex";
import "dotenv/config";
import { env } from "./env";

// Migrations são coo se fosse uma forma de controle de versão e ferramentas do nosso banco de dados. Você cria com elas tabelas, colunas no seu DB
// Servem como histórico das mudanças sendo anotadas, quando criadas tem a data e o horário

if (!process.env.DATABASE_URL) {
  throw new Error("Env is not found");
}

export const config: Knex.Config = {
  client: "sqlite", //Passar o nosso client que é qua o banco que stamos usando
  connection: {
    filename: env.DATABASE_URL, // Ai ja chamamos aqui direto de nossa var env com o schema que criamos com ZOD
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};
export const knex = setupKnex(config);
