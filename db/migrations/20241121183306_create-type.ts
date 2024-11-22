import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasColumn = await knex.schema.hasColumn("transactions", "type");
  if (!hasColumn) {
    await knex.schema.alterTable("transactions", (table) => {
      table.enum("type", ["credit", "debit"]);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const hasColumn = await knex.schema.hasColumn("transactions", "type");
  if (hasColumn) {
    await knex.schema.alterTable("transactions", (table) => {
      table.dropColumn("type");
    });
  }
}
