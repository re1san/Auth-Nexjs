import mongoose from 'mongoose';

export async function connect() {
  try {
    // ! Added because we know that it will always available
    // and TS doesnot need to worry about it
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    // You can call your variety of events on connection
    // and every event is listened by .on()
    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    })

    connection.on('error', (err) => {
      console.log('MongoDB connection error, Please make sure MongoDB is running.');
      process.exit();
    })

  } catch(error) {
    console.log("Error connecting the DB!");
    console.log(error);
  }
}