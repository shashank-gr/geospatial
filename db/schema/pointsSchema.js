const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
          },
          coordinates: {
            type: [Number],
            required: true,
          }
    },
    details:{
        type: String,
        default: ''
    }
},
{
    timestamps: true
});

pointSchema.index({location: '2dsphere'})
const Points = mongoose.model("pointSchema", pointSchema);

module.exports = Points