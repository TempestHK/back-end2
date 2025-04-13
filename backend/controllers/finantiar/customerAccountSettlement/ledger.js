import ledger from '../../../data/financiar/customerAccountSettlement/ledger.js';
import asyncHandler from '../../../middleware/asyncHandler.js';

const getLedger = asyncHandler(async (req, res) => {
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
    const count = ledger.length; // Use the length of the array for count
    const ledgerData = ledger.slice(
        (page - 1) * pageSize,
        page * pageSize
    );
    res.json({ ledgerData, page, pages: Math.ceil(count / pageSize) });
});

const createLedger = asyncHandler(async (req, res) => {
    const { shortcut_name, company_name, initial_balance, contact_number } = req.body;
    const newLedger = {
        id: req.user._id,
        shortcut_name,
        company_name,
        initial_balance,
        contact_number,
        created_at: new Date(),
    };
    ledger.push(newLedger);
    res.status(201).json(newLedger);
});

const updateLedger = asyncHandler(async (req, res) => {
    const { shortcut_name, company_name, initial_balance, contact_number } = req.body;
    const ledgerItem = await ledger.findById(req.params.id);
    if (ledgerItem) {
        ledgerItem.shortcut_name = shortcut_name || ledgerItem.shortcut_name;
        ledgerItem.company_name = company_name || ledgerItem.company_name;
        ledgerItem.initial_balance = initial_balance || ledgerItem.initial_balance;
        ledgerItem.contact_number = contact_number || ledgerItem.contact_number;
        res.json(ledgerItem);
    } else {
        res.status(404);
        throw new Error("Ledger not found");
    }
}
);

const deleteLedger = asyncHandler(async (req, res) => {
    const ledgerItem = await ledger.findById(req.params.id);
    if (ledgerItem) {
        await ledgerItem.deleteOne();
        res.json({ message: "Ledger removed" });
    } else {
        res.status(404);
        throw new Error("Ledger not found");
    }
}
);


export { getLedger, createLedger, updateLedger, deleteLedger };