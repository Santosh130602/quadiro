// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carname: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image:{type: String, required: true,}
   
},{ timestamps: true });

const Cars = mongoose.model('Cars', carSchema);
module.exports = Cars;



