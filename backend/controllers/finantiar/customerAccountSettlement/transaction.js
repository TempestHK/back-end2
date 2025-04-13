import Transaction from "../../../models/finantiar/customerAccountSettlement/transaction.js";
import asyncHandler from "../../../middleware/asyncHandler.js";

const getTransaction = asyncHandler(async (req, res) => {
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
    const count = await Transaction.countDocuments({ ...keyword });
    const transaction = await Transaction.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ transaction, page, pages: Math.ceil(count / pageSize) });
}
);

const createTransaction = asyncHandler(async (req, res) => {
    const { company_name, ledger, payment_type, amount, ledger_amount, bill, payer } = req.body;
    const transaction = new Transaction({
        id: req.user._id,
        created_at: new Date(),
        company_name,
        ledger,
        payment_type,
        amount,
        ledger_amount,
        bill,
        payer,
    });

    const createdTransaction = await transaction.save();
    res.status(201).json(createdTransaction);
});
const updateTransaction = asyncHandler(async (req, res) => {
    const { company_name, ledger, payment_type, amount, ledger_amount, bill, payer } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
        transaction.company_name = company_name || transaction.company_name;
        transaction.ledger = ledger || transaction.ledger;
        transaction.payment_type = payment_type || transaction.payment_type;
        transaction.amount = amount || transaction.amount;
        transaction.ledger_amount = ledger_amount || transaction.ledger_amount;
        transaction.bill = bill || transaction.bill;
        transaction.payer = payer || transaction.payer;

        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } else {
        res.status(404);
        throw new Error("Transaction not found");
    }
});


const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
        await transaction.deleteOne();
        res.json({ message: "Transaction removed" });
    } else {
        res.status(404);
        throw new Error("Transaction not found");
    }
});

export { getTransaction, createTransaction, updateTransaction, deleteTransaction };