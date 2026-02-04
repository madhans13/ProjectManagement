import mongoose from "mongoose";
const Mongoconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected successfully");
    }
    catch (error) {
        console.log(`connection error${error}`);
        process.exit(1);
    }
};
export default Mongoconnect;