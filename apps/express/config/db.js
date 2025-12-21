import mongoose from "mongoose";
const url = process.env.DATABASE_URL
const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
}
export default connect;