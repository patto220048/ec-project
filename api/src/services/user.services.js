import User from '../database/model/userModel.js';
import handleError from '../untils/handleError.js';
import bcrypt from 'bcrypt';
export const get = async (req, res) => {
    // kiểm tra id user hoặc admin
    if (req.user.id === req.params.id || req.user.admin) {
        const user = await User.findById(req.params.id);
        return res.status(200).json(user);
    } else {
        return res.json(handleError(false, 403, 'You not authenticated!'));
    }
};
export const getAll = async (req, res) => {
    // phân trang
    const page = req.query.page || 0;
    const perPage = req.query.limit || 5;
    const q = req.query.email;
    // kiểm tra có phải admin hay không => user=> từ chối truy cập
    if (req.user.admin) {
        try {
            //tìm user với toán tử regex
            const user = await User.find({ email: { $regex: q, $options: 'i' } })
                .limit(perPage)
                .skip(page * perPage);
            if (!user) return res.json(handleError(false, 404, 'User not found!'));
            return res.status(200).json(user);
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    } else {
        return res.json(handleError(false, 403, 'You are not allow!'));
    }
};
export const edit = async (req, res) => {
    if (req.user.id === req.params.id || req.user.admin) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            if (!user) return res.json(handleError(false, 404, 'User not found!'));
            return res.status(200).json(user);
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    } else {
        return res.json(handleError(false, 403, 'You just edited your account!'));
    }
};
export const deleteOne = async (req, res) => {
    if (req.user.id === req.params.id || req.user.admin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json('Delete successfully!');
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    } else {
        return res.json(handleError(false, 403, 'You just delete your account!'));
    }
};
