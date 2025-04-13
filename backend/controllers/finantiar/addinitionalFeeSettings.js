import additionalFeeSettingsSchema from '../../models/finantiar/addinitionalFeeSettings.js'; // Corrected path
import asyncHandler from '../../middleware/asyncHandler.js';

const getAdditionalFeeSettings = asyncHandler(async (req, res) => {
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
    const count = await additionalFeeSettingsSchema.countDocuments({ ...keyword });
    const additionalFeeSettings = await additionalFeeSettingsSchema.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ additionalFeeSettings, page, pages: Math.ceil(count / pageSize) });
});

const getAdditionalFeeSettingsById = asyncHandler(async (req, res) => {
    const additionalFeeSettings = await additionalFeeSettingsSchema.findById(req.params.id);
    if (additionalFeeSettings) {
        res.json(additionalFeeSettings);
    } else {
        res.status(404);
        throw new Error('Additional Fee Settings not found');
    }
});
const createAdditionalFeeSettings = asyncHandler(async (req, res) => {
    const {
        categories,
        fee_code,
        fee_name,
        unit_measurement,
        capacity,
        fee_amount,
        created_by,
    } = req.body;

    const additionalFeeSettings = new additionalFeeSettingsSchema({
        id: req.user._id,
        categories,
        fee_code,
        fee_name,
        unit_measurement,
        capacity,
        fee_amount,
        created_by,
        createdAt: new Date(),
    });

    const createdAdditionalFeeSettings = await additionalFeeSettings.save();
    res.status(201).json(createdAdditionalFeeSettings);
});

const updateAdditionalFeeSettings = asyncHandler(async (req, res) => {
    const {
        categories,
        fee_code,
        fee_name,
        unit_measurement,
        capacity,
        fee_amount,
        created_by,
    } = req.body;

    const additionalFeeSettings = await additionalFeeSettingsSchema.findById(req.params.id);
    if (additionalFeeSettings) {
        additionalFeeSettings.categories = categories;
        additionalFeeSettings.fee_code = fee_code;
        additionalFeeSettings.fee_name = fee_name;
        additionalFeeSettings.unit_measurement = unit_measurement;
        additionalFeeSettings.capacity = capacity;
        additionalFeeSettings.fee_amount = fee_amount;
        additionalFeeSettings.created_by = created_by;

        const updatedAdditionalFeeSettings = await additionalFeeSettings.save();
        res.json(updatedAdditionalFeeSettings);
    } else {
        res.status(404);
        throw new Error('Additional Fee Settings not found');
    }
});
const deleteAdditionalFeeSettings = asyncHandler(async (req, res) => {
    const additionalFeeSettings = await additionalFeeSettingsSchema.findById(req.params.id);
    if (additionalFeeSettings) {
        await additionalFeeSettings.remove();
        res.json({ message: 'Additional Fee Settings removed' });
    } else {
        res.status(404);
        throw new Error('Additional Fee Settings not found');
    }
});
export{
    getAdditionalFeeSettings,
    getAdditionalFeeSettingsById,
    createAdditionalFeeSettings,
    updateAdditionalFeeSettings,
    deleteAdditionalFeeSettings,
};
