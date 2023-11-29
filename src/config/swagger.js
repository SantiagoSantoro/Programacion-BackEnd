import { dirname } from 'path';
import { fileURLToPath } from 'url';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Ecommerce',
      description: 'Documentación de API de Ecommerce',
    },
  },
  apis: [`${__dirname}/../docs/**/*.yaml`], 
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);
export const swaggerUi = swaggerUiExpress;
