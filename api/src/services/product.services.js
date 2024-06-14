import handleError from '../untils/handleError.js';
import Product from '../database/model/productModel.js';
import Category from '../database/model/categoryModel.js';
import mongoose from 'mongoose';
import isValidObjectId from '../untils/isValidOjectId.js';
export const createProduct = async (req, res) => {
    if (req.user.admin === true) {
        try {
            const newProduct = new Product({ ...req.body });
            await newProduct.save();
            res.status(200).json(newProduct);
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    } else {
        return res.json(handleError(false, 403, 'You are not admin'));
    }
};

export const getProducts = async (req, res) => {
    let filter = {};
    if (req.query.categories) {
        filter = { categories: req.query.categories.split(',') };
    }

    try {
        const product = await Product.find(filter).populate('categories');
        if (!product) {
            res.json(handleError(false, 404, 'Product not found!'));
        }
        res.status(200).json(product);
    } catch (error) {
        return res.json(handleError(false, 500, error.message, 'Server error!!'));
    }
};

export const getTinyProducts = async (req, res) => {
    try {
        const product = await Product.find().select('name image -_id');
        if (!product) {
            res.json(handleError(false, 404, 'Product not found!'));
        }
        res.status(200).json(product);
    } catch (error) {
        return res.json(handleError(false, 500, error.message, 'Server error!!'));
    }
};

export const getProductWithSlug = async (req, res) => {
    const params = req.params.slug;
    try {
        const product = await Product.find({ tags: { $all: [params] } });
        res.status(200).json(product);
    } catch (error) {
        return res.json(handleError(false, 500, error.message, 'Server error!!'));
    }
};
export const getCountProduct = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        if (!productCount) return res.json(handleError(false, 404, 'Product not found!'));
        return res.status(200).json({ success: true, productCount });
    } catch (error) {
        return res.json(handleError(false, 500, error.message, 'Server error!!'));
    }
};
export const getfeaturedProducts = async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).populate('categories').limit(+count);
        if (!featuredProducts) return res.json(handleError(false, 404, 'Product not found!'));
        return res.status(200).json(featuredProducts);
    } catch (error) {
        return res.json(handleError(false, 500, error.message, 'Server error!!'));
    }
};
export const editProduct = async (req, res) => {
    if (req.user.admin === true) {
        try {
            const category = await Category.findById(req.body.categories);
            if (!category) return res.json(handleError(false, 404, 'Category invalid!'));
            const newProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(newProduct);
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    } else {
        return res.json(handleError(false, 403, 'You are not admin'));
    }
};
export const addTagsProduct = async (req, res) => {
    if (req.user.admin === true) {
        try {
            await Product.updateOne({ _id: req.params.id }, { $push: { categories: req.body.categories } });
            res.status(200).json('Add tags successfully!');
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    } else {
        return res.json(handleError(false, 403, 'You are not admin'));
    }
};
export const removeTagsProduct = async (req, res) => {
    if (req.user.admin === true) {
        try {
            await Product.updateOne({ _id: req.params.id }, { $pull: { categories: req.body.categories } });
            res.status(200).json('Remove tags successfully!');
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    } else {
        return res.json(handleError(false, 403, 'You are not admin'));
    }
};
export const deleteProduct = async (req, res) => {
    if (req.user.admin === true) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) return res.json(handleError(false, 404, 'Product not found!'));
            res.status(200).json({ success: true, message: 'Delete product successfully!' });
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    } else {
        return res.json(handleError(false, 403, 'You are not admin'));
    }
};

export const addImgProduct = async (req, res) => {
    if (req.user.admin === true) {
        try {
            await Product.updateOne({ _id: req.params.id }, { $push: { images: req.body.img } });
            res.status(200).json('Add images successfully!');
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    } else {
        return res.json(handleError(false, 403, 'You are not admin'));
    }
};

export const removeImgProduct = async (req, res) => {
    if (req.user.admin === true) {
        try {
            await Product.updateOne({ _id: req.params.id }, { $pull: { images: req.body.img } });
            res.status(200).json('Remove images successfully!');
        } catch (error) {
            return res.json(handleError(false, 500, error.message, 'Server error!!'));
        }
    } else {
        return res.json(handleError(false, 403, 'You are not admin'));
    }
};
export const getDetailProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categories');
        if (!product) return res.json({ status: 404, message: 'Product not found!' });
        res.status(200).json(product);
    } catch (error) {
        return res.json(handleError(false, 500, error.message, 'Server error!!'));
    }
};
