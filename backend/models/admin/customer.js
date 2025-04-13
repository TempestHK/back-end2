import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    shortcut_name: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    is_broker: {
        type: Boolean,
        required: true,
        trim: true,
    },
    ledger_name: {
        type: String,
        required: true,
        trim: true,
    },
    contact_number: {
        type: Number,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;