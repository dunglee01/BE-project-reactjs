import express from 'express';
import cors from 'cors';
import {connectDb} from './db.js'
import { AuthRouter } from './routers/index.js';

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


app.use('/api/v1', AuthRouter);

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