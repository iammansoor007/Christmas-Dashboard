import mongoose from 'mongoose';

const QuoteFormSchema = new mongoose.Schema({
    badge: String,
    title: String,
    subtitle: String,
    submitButtonText: String,
    successMessage: String,
    fields: {
        firstName: {
            label: String,
            placeholder: String,
            required: Boolean
        },
        lastName: {
            label: String,
            placeholder: String,
            required: Boolean
        },
        email: {
            label: String,
            placeholder: String,
            required: Boolean
        },
        phone: {
            label: String,
            placeholder: String,
            required: Boolean
        },
        address: {
            label: String,
            placeholder: String,
            required: Boolean
        },
        city: {
            label: String,
            placeholder: String,
            required: Boolean
        },
        budget: {
            label: String,
            placeholder: String,
            required: Boolean,
            options: [String]
        },
        lightingAreas: {
            label: String
        },
        notes: {
            label: String,
            placeholder: String,
            required: Boolean
        },
        fileUpload: {
            label: String,
            placeholder: String,
            helperText: String
        }
    },
    benefits: [{
        text: String,
        icon: String
    }],
    contactInfo: {
        phone: String,
        email: String,
        hours: String,
        support: String
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const QuoteForm = mongoose.models.QuoteForm || mongoose.model('QuoteForm', QuoteFormSchema);

export default QuoteForm;