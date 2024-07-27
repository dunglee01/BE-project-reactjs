
import mongoose from 'mongoose';


const PORT = process.env.PORT || 3001;
const connectDb = (app) => {
    mongoose.connect('mongodb+srv://dunglv:dunglv@cluster0.wu1fc.mongodb.net/ecommerce', {
      }).then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
          });
      }).catch((err) => {
        console.error('Failed to connect to MongoDB', err);
      });
}

export {
    connectDb
}