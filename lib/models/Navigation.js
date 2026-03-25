import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['page', 'services', 'custom', 'dropdown'],
        required: true
    },
    label: {
        type: String,
        required: true
    },
    href: String,
    pageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    },
    order: {
        type: Number,
        default: 0
    },
    children: [{
        type: mongoose.Schema.Types.Mixed
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { _id: false });

const NavigationSchema = new mongoose.Schema({
    location: {
        type: String,
        enum: ['header', 'footer', 'mobile'],
        default: 'header',
        unique: true
    },
    items: [MenuItemSchema],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Pre-save: Ensure only one navigation per location
NavigationSchema.pre('save', async function () {
    if (this.isNew) {
        const NavigationModel = mongoose.models.Navigation;
        if (NavigationModel) {
            await NavigationModel.updateMany(
                { location: this.location, _id: { $ne: this._id } },
                { $set: { items: [] } }
            );
        }
    }
    this.lastUpdated = new Date();
});

const Navigation = mongoose.models.Navigation || mongoose.model('Navigation', NavigationSchema);

export default Navigation;