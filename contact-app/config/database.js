import mongoose from 'mongoose';

export const contactDB = () => {
    mongoose.connect('mongodb+srv://muhammadaliraza7530_db_user:tvymLrhKO1Xw9tTI@cluster0.vouss7c.mongodb.net')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
}
