
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({

    name:{
        type: String,
        required: true
    },
    icon:{
        type: String,
    },
    color: { 
        type: String,
    }

});

export default mongoose.model('categories', categorySchema);
