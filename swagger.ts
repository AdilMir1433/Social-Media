/* eslint-disable import/no-extraneous-dependencies */
import { Express } from 'express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Social Media API',
      description:
        'API endpoints for a mini Social Media services documented on swagger',
      contact: {
        name: 'Adil Mir',
        email: 'adil.mir@devsinc.com',
        url: 'https://github.com/AdilMir1433/Social-Media',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:6969/api/',
        description: 'Local server',
      },
      {
        url: 'heheboi.com',
        description: 'Live server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ['src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
