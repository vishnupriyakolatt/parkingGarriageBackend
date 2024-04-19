const mongoose = require("mongoose");
const slotSchema = new mongoose.Schema({

carno:{
  type: String,
  required: true,
},
slotno:{
    type: String,
    required: true,
}
});

module.exports = mongoose.model("SlotBook", slotSchema);