import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filePath: { type: String, required: true },
  contentType: { type: String, required: true },
  url: { type: String, required: true }
});

// Use mongoose.models to check if the model is already compiled
const Resource = mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);

export default Resource;
