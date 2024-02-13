import mongoose from "mongoose";

let connected = false;

export const ConnectDB = async () => {
  const uri = process.env.MONGODB_URL;
  console.log(uri);

  if (connected) {
    console.log("Database Connected");
  }
  try {
    if (uri) {
      console.log(uri);

      await mongoose.connect(uri, {
        dbName: "modernnest",
      });
      connected = true;
      console.log("Database Connected");
    }
  } catch (error) {
    console.log("Error connecting Database", error);
  }
};
