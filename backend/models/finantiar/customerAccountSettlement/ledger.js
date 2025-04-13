import mongoose from 'mongoose';

const ledgerSchema = new mongoose.Schema({
    shortcut_name: {
        type: String,
        required: true,
        trim: true,
    },
    company_name: {
        type: String,
        required: true,
        trim: true,
    },
    initial_balance: {
        type: Number,
        required: true,
        trim: true,
       
    },
    contact_number: {
        type: String,
        required: true,
        trim: true,
    },
    
});

const Ledger = mongoose.model('Ledger', ledgerSchema);

export default Ledger;