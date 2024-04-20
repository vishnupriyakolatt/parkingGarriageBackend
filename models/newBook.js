const mongoose = require("mongoose");
const { Schema } = mongoose;

const newBookSchema = new Schema({
    carno: {
        type: String,
        required: true,
    },
    slotno: {
        type: String,
        required: true,
    },
    date: {
        type: Date, 
        default: Date.now, 
    },
    stime: {
        type: Number, 
        required: true,
    },
    etime: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model("newBook", newBookSchema);

