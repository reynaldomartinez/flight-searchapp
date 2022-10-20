import mongoose from 'mongoose';
const { Schema } = mongoose;

const favoritesSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        flightname: {
            type: String,
            required: true
        },
        flightdescription: {
            type: String,
            required: true
        },
        date: { 
            type: Date,
            default: Date.now
        },
        completed: {
            type: Boolean,
            default: false
        }
    }
)

module.exports = mongoose.model('Favorites', favoritesSchema);