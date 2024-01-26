const mongoose = require('mongoose');

const polygonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Polygon'],
            default: 'Polygon'
        },
        coordinates: {
            type: [[[Number]]],
            required: true,
        },
    },
    description:{
        type: String,
        default: ''
    }

},
{
    timestamps: true
});

polygonSchema.index({location: '2dsphere'})

const Polygons = mongoose.model("polygonSchema",polygonSchema) 

module.exports = Polygons