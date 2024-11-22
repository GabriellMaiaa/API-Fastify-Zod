//Esse file vem para definir os tipos dos nossos dados, por o "d" no nome

import { Knex } from "knex";

//Aqui definimos usando os tipos do knex para poder ter uma melhor manuntenção dos nossos campos das tabelas

declare module "knex/types/tables" {
  export interface Tables {
    transactions: {
      id: string;
      title: string;
      amount: number;
      created_at: string;
      session_id: string;
    };
  }
}
