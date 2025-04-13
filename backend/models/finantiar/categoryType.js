import mongoose from 'mongoose';

const categoryTypeSchema = new mongoose.Schema({
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
    catefory_type: {
        type: String,
        required: true,
        trim: true,
        enum : ['Олголт' , 'Ачилт'],
    },
    created_by: {
        type: String,
        required: true,
        trim: true,
    },
});
const CategoryType = mongoose.model('CategoryType', categoryTypeSchema);
export default CategoryType;