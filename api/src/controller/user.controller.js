import { deleteOne, edit, get, getAll } from '../services/user.services.js';
import isValidObjectId from '../untils/isValidOjectId.js';
class userController {
    async getUser(req, res) {
        isValidObjectId(res, req.params.id);
        get(req, res);
    }
    async getUsers(req, res) {
        getAll(req, res);
    }
    async editUser(req, res) {
        isValidObjectId(res, req.params.id);

        edit(req, res);
    }

    async deleteUser(req, res) {
        isValidObjectId(res, req.params.id);

        deleteOne(req, res);
    }
}
export default new userController();
