import { createCategory, deleteCategory, getCategory, updateCategory } from '../services/category.service.js';

class categoryController {
    create(req, res) {
        createCategory(req, res);
    }
    delete(req, res) {
        deleteCategory(req, res);
    }
    update(req, res) {
        updateCategory(req, res);
    }
    get(req, res) {
        getCategory(req, res);
    }
}

export default new categoryController();
