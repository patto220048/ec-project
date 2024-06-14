import Category from '../database/model/categoryModel.js';
import handleError from '../untils/handleError.js';

export const createCategory = async (req, res) => {
    const newCategory = new Category({ ...req.body });
    try {
        const category = await newCategory.save();
        if (!category) return res.json(handleError(false, 404, "Category can't not created!"));
        res.status(200).json(newCategory);
    } catch (err) {
        res.json(handleError(false, 500, err.message, 'Server ERROR'));
    }
};

export const deleteCategory = (req, res) => {
    Category.findOneAndDelete(req.params.id)
        .then((category) => {
            if (category) {
                return res.status(200).json({ success: true, message: 'Delete category successfully!' });
            }
            return res.json(handleError(false, 404, 'Category not found!'));
        })
        .catch((err) => {
            res.json(handleError(false, 500, err.message, 'Server ERROR'));
        });
};

export const updateCategory = async (req, res) => {
    try {
        const newCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true,
            },
        );
        return res.status(200).json(newCategory);
    } catch (error) {
        res.json(handleError(false, 500, error.message, 'Server ERROR'));
    }
};
export const getCategory = async (req, res) => {
    try {
        const category = await Category.find();
        return res.status(200).json(category);
    } catch (error) {
        res.json(handleError(false, 500, error.message, 'Server ERROR'));
    }
};
