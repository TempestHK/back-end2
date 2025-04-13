import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
 
    created_at: {
        type: Date,
        required: true,
    },
    company_name: {
        type: String,
        required: true,
        trim: true,
    },
    ledger: {
        type: Number,
        required: true,
        trim: true,
       
    },
    payment_type: {
        type: String,
        required: true,
        trim: true,
        enum: ['cash', 'non_cash'],
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
       
    },
    ledger_amount: {
        type: Number,
        required: true,
        trim: true,
       
    },
    bill: {
        type: String,
        required: true,
        trim: true,
    },
    payer: {
        type: String,
        required: true,
        trim: true,
    },
});
const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;