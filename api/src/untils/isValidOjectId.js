import mongoose from 'mongoose';
import handleError from './handleError.js';

const isValidObjectId = (res, id) => {
    if (!mongoose.isValidObjectId(id)) {
        return res.json(handleError(false, 500, 'Invalid Oject Id!'));
    }
};

export default isValidObjectId;
