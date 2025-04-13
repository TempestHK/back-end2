import ForeignCompany from "../../models/finantiar/foreignCompany.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const getForeignCompany = asyncHandler(async (req, res) => {
    const pageSize = Number(process.env.PAGINATION_LIMIT) || 10; // Ensure pageSize is a number
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};
    const count = await ForeignCompany.countDocuments({ ...keyword });
    const foreignCompany = await ForeignCompany.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ foreignCompany, page, pages: Math.ceil(count / pageSize) });
});

const createForeignCompany = asyncHandler(async (req, res) => {
    const { name, code , created_by} = req.body;
    const foreignCompany = new ForeignCompany({
        id: req.params.id,
        name,
        code,
        created_by,
    });

    const createdForeignCompany = await foreignCompany.save();
    res.status(201).json(createdForeignCompany);
});

const updateForeignCompany = asyncHandler(async (req, res) => {
    const { name, code , created_by} = req.body;
    const foreignCompany = await ForeignCompany.findById(req.params.id);
    if (foreignCompany) {
        foreignCompany.name = name;
        foreignCompany.code = code;
        foreignCompany.created_by = created_by;

        const updatedForeignCompany = await foreignCompany.save();
        res.json(updatedForeignCompany);
    } else {
        res.status(404);
        throw new Error('Foreign Company not found');
    }
}
);

const deleteForeignCompany = asyncHandler(async (req, res) => {
    const foreignCompany = await ForeignCompany.findById(req.params.id);
    if (foreignCompany) {
        await foreignCompany.deleteOne();
        res.json({ message: 'Foreign Company removed' });
    } else {
        res.status(404);
        throw new Error('Foreign Company not found');
    }
});

export { getForeignCompany, createForeignCompany, updateForeignCompany, deleteForeignCompany };
