import CustomerCompany from '../../models/finantiar/customerCompany.js'; // Fixed capitalization
import asyncHandler from '../../middleware/asyncHandler.js';

const getCustomerCompany = asyncHandler(async (req, res) => {
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
    const count = await CustomerCompany.countDocuments({ ...keyword });
    const customerCompany = await CustomerCompany.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ customerCompany, page, pages: Math.ceil(count / pageSize) });
});

const getCustomerCompanyById = asyncHandler(async (req, res) => {
    const customerCompany = await CustomerCompany.findById(req.params.id);
    if (customerCompany) {
        res.json(customerCompany);
    } else {
        res.status(404);
        throw new Error('Customer Company not found');
    }
});

const createCustomerCompany = asyncHandler(async (req, res) => {
    const { shortcut_name, name, is_broker, ledger_name, contact_number, email } = req.body;
    const customerCompany = new CustomerCompany({
        shortcut_name,
        name,
        is_broker,
        ledger_name,
        contact_number,
        email,
        created_by: req.user._id,
    });

    const createdCustomerCompany = await customerCompany.save();
    res.status(201).json(createdCustomerCompany);
});

const updateCustomerCompany = asyncHandler(async (req, res) => {    
    const { shortcut_name, name, is_broker, ledger_name, contact_number, email } = req.body;
    const customerCompany = await CustomerCompany.findById(req.params.id);
    if (customerCompany) {
        customerCompany.shortcut_name = shortcut_name;
        customerCompany.name = name;
        customerCompany.is_broker = is_broker;
        customerCompany.ledger_name = ledger_name;
        customerCompany.contact_number = contact_number;
        customerCompany.email = email;

        const updatedCustomerCompany = await customerCompany.save();
        res.json(updatedCustomerCompany);
    } else {
        res.status(404);
        throw new Error('Customer Company not found');
    }
});

const deleteCustomerCompany = asyncHandler(async (req, res) => {
    const customerCompany = await CustomerCompany.findById(req.params.id);
    if (customerCompany) {
        await customerCompany.remove();
        res.json({ message: 'Customer Company removed' });
    } else {
        res.status(404);
        throw new Error('Customer Company not found');
    }
});

export {
    getCustomerCompany,
    getCustomerCompanyById,
    createCustomerCompany,
    updateCustomerCompany,
    deleteCustomerCompany,
};