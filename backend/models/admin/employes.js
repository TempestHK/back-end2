import mongoose from 'mongoose';

const employesSchema = new mongoose.Schema({
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    role_name: {
        type: String,
        required: true,
        trim: true,
    },
});

const Employes = mongoose.model('Employes', employesSchema);
export default Employes;