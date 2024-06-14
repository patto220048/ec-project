import { isValidObjectId } from 'mongoose';
import {
    createProduct,
    getProducts,
    getProductWithSlug,
    addTagsProduct,
    removeTagsProduct,
    editProduct,
    deleteProduct,
    addImgProduct,
    removeImgProduct,
    getDetailProduct,
    getTinyProducts,
    getCountProduct,
    getfeaturedProducts

} from '../services/product.services.js';

class productController {
    add(req, res) {
        createProduct(req, res);
    }
    getAll(req, res) {
        getProducts(req, res);
    }
    getWithSlug(req, res) {
        getProductWithSlug(req, res);
    }
    getDetail(req, res){
        getDetailProduct(req, res)
    }
    getTiny(req, res){
        getTinyProducts(req, res)
    }
    edit(req, res) {
        isValidObjectId(res, req.params.id);
        editProduct(req, res);
    }
    addTags(req, res) {
        addTagsProduct(req, res);
    }
    removeTags(req, res) {
        removeTagsProduct(req, res);
    }
    detele(req,res){
        isValidObjectId(res, req.params.id);
        deleteProduct(req,res);
    }
    addImg(req,res) {
        addImgProduct(req,res);
    }
    removeImg(req,res){
        removeImgProduct(req,res);
    }
    getCount(req,res){
        getCountProduct(req,res);
    }
    getfeatured(req,res){
        getfeaturedProducts(req,res);
    }
}

export default new productController();