import mongoose from 'mongoose';

const cancelingTicketSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     trim: true,
    // },
    type: {
        type: String,
        required: true,
        trim: true,
        enum: ['Ачилт', 'Олголт'],
    },
    request_cassir: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
        enum: ['Үүссэн', 'Цуцлагдсан'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
   
    });

const CancelingTicket = mongoose.model('CancelingTicket', cancelingTicketSchema);
export default CancelingTicket;