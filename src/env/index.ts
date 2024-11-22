// Vamos usar a biblioteca ZOD que funciona na parte da validação de dados.
// Vamos usar primeiramente para validar nossas variáveis de ambiente

import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  // Estamos criando um schema para mostrar como devem retornar os valores de nossas var de ambiente

  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
});

export const env = envSchema.parse(process.env);
