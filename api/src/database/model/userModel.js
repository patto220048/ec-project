import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserModel = new Schema(
    {
        
    },
    {
        timestamps : true,
    }
);

export default mongoose.model('User', UserModel);
