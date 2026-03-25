import mongoose from 'mongoose';

const RedirectSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    to: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        default: 301
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Redirect = mongoose.models.Redirect || mongoose.model('Redirect', RedirectSchema);

export default Redirect;