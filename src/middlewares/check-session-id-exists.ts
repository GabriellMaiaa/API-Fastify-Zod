import { FastifyReply, FastifyRequest } from "fastify";

// Aqui estou criando o meu middleware que faz a verificação se existe ou nao o meu session Id com os Cookies

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sessionId = request.cookies.sessionId; // Passo os cookies pela nossa request

  if (!sessionId) {
    // E valido nesse if se existr ou nao
    return reply.status(401).send({
      error: "Unauthorized",
    });
  }
}
