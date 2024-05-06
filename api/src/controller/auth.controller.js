import User from '../database/model/userModel.js';
import { generateAccessToken, generateRefreshToken } from '../untils/generate-jwt.js';
import handleError from '../untils/error/handleError.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

class authController {
    //sign up
    async signup(req, res) {
        try {
            //kiểm tra user có trong database hay chưa.
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                // băm mật khẩu
                const salt = await bcrypt.genSaltSync(10);
                const hash = await bcrypt.hashSync(req.body.password, salt);
                // lưu user vào database
                const newUser = new User({ ...req.body, password: hash });
                await newUser.save();
                return res.status(200).json(newUser);
            }
            return res.json(handleError(false, 401, 'User already exists!'));
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    }
    // login
    async login(req, res) {
        try {
            // kiểm tra user trong database
            const user = await User.findOne({ email: req.body.email });
            if (!user) return res.json(handleError(false, 500, 'User not found!'));
            // kiểm tra mật khẩu
            const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
            if (!isCorrectPassword) return res.json(handleError(false, 401, 'Password incorrect!'));
            // mã ngẫu nhiên cho signature của jwt
            const jwt_key = uuidv4();
            // tạo access token cho user
            const accessToken = generateAccessToken(user, jwt_key);
            const refreshToken = generateRefreshToken(user, jwt_key);
            // lưu refresh token vào data base
            const setRefreshToken = await User.findOneAndUpdate(
                user._id,
                { $set: { refreshToken: refreshToken } },
                { new: true },
            );
            // ẩn password khi response về cho client
            const { password, ...others } = setRefreshToken._doc;
            res.status(201)
                // lưu jwt key vào cookie
                .cookie('keyUuidv', jwt_key, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 8 * 3600000),
                })
                .json({ ...others, accessToken });
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    }

    async refreshToken(req, res) {
        // lấy refresh token từ user
        const refreshToken = req.body.token;
        //jwt key
        const jwtKey = req.cookies.keyUuidv;
        // response lỗi khi token không đúng
        if (!refreshToken) return res.json(handleError(false, 401, 'You are not authenticated!'));
        try {
            // kiểm tra refresh token của user, nếu không có token không lệ
            const userRefresh = await User.findOne({ refreshToken: refreshToken });
            if (!userRefresh) {
                return res.json(handleError(false, 401, 'Refresh token not valid!!'));
            }
            // giải mã refresh token
            jwt.verify(refreshToken, jwtKey, async (err) => {
                // const newJwtKey = uuidv4();
                if (err) return res.json(handleError(false, 401, err.message));
                // đặt lại accessToken mới và lưu refreshtoken mới vào lại database
                const newRefreshToken = await generateRefreshToken(userRefresh, jwtKey);
                const newAccessToken = await generateAccessToken(userRefresh, jwtKey);
                await User.findOneAndUpdate(
                    userRefresh._id,
                    { $set: { refreshToken: newRefreshToken } },
                    { new: true },
                );
                // giử lại refresh token và accessToken mới
                return res.status(200).json({ refreshToken: newRefreshToken, accessToken: newAccessToken });
            });
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    }

    async logout(req, res) {
        const refreshToken = req.body.token;
        if (!refreshToken) return res.json(handleError(false, 500, 'Invalid refresh token!'));
        try {
            const user = await User.findOneAndUpdate(
                { refreshToken: refreshToken },
                { $set: { refreshToken: null } },
                { new: true },
            );
            if (user) return res.status(201).json('Log out successfully!');
            else return res.json(handleError(true, 200, 'You logged out successfully!'));
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    }
}
export default new authController();
