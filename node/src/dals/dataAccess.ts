import Mongoose from 'mongoose';

export const startConnection = async (database: string, host: string = 'localhost', port: number = 27017) => {
  try {
    await Mongoose.connect(`mongodb://${host}:${port}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw error;
  }
};
