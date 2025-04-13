import mongoose from 'mongoose';

const foreignCompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        trim: true,
    },
    created_by: {
        type: String,
        required: true,
        trim: true,
    },
    });
const ForeignCompany = mongoose.model('ForeignCompany', foreignCompanySchema);
export default ForeignCompany;