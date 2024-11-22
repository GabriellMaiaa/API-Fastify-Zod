import type { Knex } from "knex";

const config: Knex.Config = {
  client: "sqlite", //Passar o nosso client que é qua o banco que stamos usando
  connection: {
    filename: "./db/app.db",
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};
export default config;
// Para criar a migration estou rodando npx knex migrate:make create-documents
// Para criar e rodar as migrations pendentes npx knex migrate:latest and rollback
