import fs from 'fs';

async function api(fastify, options) {
  fastify.get('/api/test', async (request, reply) => {
    reply
      .type('application/json')
      .send({
        success: true,
        timestamp: Date.now()
      });
  });
}

async function client(fastify, options) {
  fastify.get('/*', async (request, reply) => {
    const mainDocument = fs.readFileSync('./assets/documents/main.html', 'utf-8');

    reply
      .type('text/html')
      .send(mainDocument);
  });
}

export default {
  client,
  api
};