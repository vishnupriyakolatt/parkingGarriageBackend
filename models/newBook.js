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
    Lid: {
        type: String,
        required: true,
    },
    date: {
        type: Date, 
        default: Date.now, 
    },
    stime: {
        type: Date, 
        required: true,
    },
    etime: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("newBook", newBookSchema);
