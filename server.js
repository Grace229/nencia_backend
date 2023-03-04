const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express')


dotenv.config();
const server = http.createServer(app);

// const options ={
//   definition:{
//     openapi : "3.0.0",
//     info: {
//       title: "Nencia API",
//       version: "1.0.0"
//     },
//     servers:[
//       {
//         url: 'http://localhost:8080/'
//       }
//     ]
//   },
//   apis: ['./server.js']
// }
// const swaggerSpec = swaggerJSDoc(options)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// /**
//  * @swagger
//  * /api/v1/product/get-category:
//  * get:
//  *     summary: To get all categories
//  *     description: this is all categories
//  *     responses:
//  *      200:
//  *          description: this is a categories thing
//  *          content:
//  *                 application/json
//  */
const port = process.env.PORT || 8080;

mongoose.connect(process.env.mongo_URL)
  .then(() => console.log('Database up and doing:::'))
  .catch(err => console.log(`Database Connection error: ${err.message}`));
server.listen(port, () => console.log(`Server listenig on::: ${port}`));