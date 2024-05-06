import User from '../database/model/userModel.js';
import handleError from '../untils/error/handleError.js';

class userController {
    async getUser(req, res) {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            const user = await User.findById(req.params.id);
            return res.status(200).json(user);
        } else {
            return res.json(handleError(false, 403, 'You not authenticated!'));
        }
    }
}
export default new userController();
