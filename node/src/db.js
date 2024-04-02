import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://matee23:Mateo2007@backendmaccarone.my3y3qu.mongodb.net/tw"
    );
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};
