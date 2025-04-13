import CategoryType from "../../models/finantiar/categoryType.js";
import asyncHandler from "express-async-handler";


const getCategoryType = asyncHandler(async (req, res) => {
    const pageSize = Number(process.env.PAGINATION_LIMIT) || 10; // Ensure pageSize is a number
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? {
            name: {
            $regex: req.query.keyword,
            $options: "i",
            },
        }
        : {};
    const count = await CategoryType.countDocuments({ ...keyword });
    const categoryType = await CategoryType.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ categoryType, page, pages: Math.ceil(count / pageSize) });
});

const createCategoryType = asyncHandler(async (req, res) => {
    const { name, code, catefory_type, created_by } = req.body;
    const newCategoryType = new CategoryType({
        id: req.user._id,
        name,
        code,
        catefory_type,
        created_by,
    });
    const createdCategoryType = await newCategoryType.save();
    res.status(201).json(createdCategoryType);
});

const updateCategoryType = asyncHandler(async (req, res) => {
    const { name, code, catefory_type, created_by } = req.body;
    const categoryType = await CategoryType.findById(req.params.id);
    if (categoryType) {
        categoryType.name = name || categoryType.name;
        categoryType.code = code || categoryType.code;
        categoryType.catefory_type = catefory_type || categoryType.catefory_type;
        categoryType.created_by = created_by || categoryType.created_by;
        const updatedCategoryType = await categoryType.save();
        res.json(updatedCategoryType);
    } else {
        res.status(404);
        throw new Error("Category Type not found");
    }
}
);

const deleteCategoryType = asyncHandler(async (req, res) => {
    const categoryType = await CategoryType.findById(req.params.id);
    if (categoryType) {
        await categoryType.remove();
        res.json({ message: "Category Type removed" });
    } else {
        res.status(404);
        throw new Error("Category Type not found");
    }
});

export { getCategoryType, createCategoryType, updateCategoryType, deleteCategoryType };