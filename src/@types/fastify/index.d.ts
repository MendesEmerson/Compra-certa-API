import fastify, { FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    user_id: string
  }
}