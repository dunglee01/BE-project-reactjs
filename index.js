import express from 'express';
import cors from 'cors';
import {connectDb} from './db.js'
import { AuthRouter, ProductRouter } from './routers/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
// Middleware for parsing request body
app.use(express.json());
// app.use(bodyParser.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'], 
//   })
// );

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = { customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.css' };

const spec = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8')
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec, options));
app.use('/api/v1', AuthRouter);
app.use('/api/v1', ProductRouter);

// app.use('/books', booksRoute);

// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log('App connected to database');
//     app.listen(PORT, () => {
//       console.log(`App is listening to port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const start = () => {
    connectDb(app);
}

start()