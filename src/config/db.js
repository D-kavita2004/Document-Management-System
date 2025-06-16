import mongoose from "mongoose";

const connectDB = async()=>{
      try{
            mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`).then(()=>{
                  console.log("DB connection succesful");
            })

      }
      catch(error){
            console.log("sorrryyyyyyyy");
            console.log(error);
      }
}
export default connectDB;
