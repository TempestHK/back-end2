import Customer from "../../models/admin/customer.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const getCustomer = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Customer.countDocuments({ ...keyword });
  const customerList = await Customer.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ customerList, page, pages: Math.ceil(count / pageSize) });
});

const createCustomer = asyncHandler(async (req, res) => {
    const { shortcut_name, name, is_broker, ledger_name, contact_number, email } =
        req.body;
    const customer = new Customer({
        id: req.user._id,
        shortcut_name: shortcut_name || "Sample shortcut_name",
        name: name || "Sample name",
        is_broker: is_broker || false,
        ledger_name: ledger_name || "Sample ledger_name",
        contact_number: contact_number || 0,
        email: email || "Sample email",
    });
    
    const createdCustomer = await customer.save();
    res.status(201).json(createdCustomer);
});

const getCustomerById = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
        res.json(customer);
    } else {
        res.status(404);
        throw new Error("Customer not found");
    }
});

const updateCustomer = asyncHandler(async (req, res) => {
    const { shortcut_name, name, is_broker, ledger_name, contact_number, email } =
        req.body;
    const customer = await Customer.findById(req.params.id);
    if (customer) {
        customer.shortcut_name = shortcut_name;
        customer.name = name;
        customer.is_broker = is_broker;
        customer.ledger_name = ledger_name;
        customer.contact_number = contact_number;
        customer.email = email;

        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);
    } else {
        res.status(404);
        throw new Error("Customer not found");
    }
}
);

const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
        await customer.remove();
        res.json({ message: "Customer removed" });
    } else {
        res.status(404);
        throw new Error("Customer not found");
    }
});

export {
    getCustomer,
    createCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};