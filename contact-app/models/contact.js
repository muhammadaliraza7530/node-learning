import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({ 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true }
})

const contact = mongoose.model('Contact', contactSchema);

export default contact;