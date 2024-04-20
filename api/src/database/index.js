import mongoose from "mongoose"


async function connect () {
    try {
        await mongoose.connect(process.env.MONGOBD_URL)
        console.log("Server connected database!")
    }
    catch {
        console.log("Server connect fail! Check agian.")
    }
}

export default {connect};