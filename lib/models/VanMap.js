import mongoose from 'mongoose';

const VanMapSchema = new mongoose.Schema({
  title: String,
  description: String,
  mapImage: String,
  vanImage: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const VanMap = mongoose.models.VanMap || mongoose.model('VanMap', VanMapSchema);

export default VanMap;