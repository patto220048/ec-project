import User from '../database/model/userModel.js';
import handleError from '../untils/error/handleError.js';
import bcrypt from "bcrypt"
class authController {
    //sign up
    async signup(req, res) {
        try {
            //kiểm tra user có trong database hay chưa.
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                // băm mật khẩu
                const salt = await bcrypt.genSaltSync(64);
                const hash = await bcrypt.hashSync(req.body.password, salt);
                // lưu user vào database
                const newUser = new User({ ...req.body, password: hash });
                await newUser.save();
                return res.status(200).json(newUser);
            }
            return res.json(handleError(false, 401, 'User already exists!'));
        } catch (error) {
            console.log(error.message);
            return res.json(handleError(false, 500, error.message, "Server error!!"));
        }
    }
    // login

    async login(req, res) {
        
    }
}
export default new authController();
