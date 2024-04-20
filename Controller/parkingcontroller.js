// parkingcontroller.js
const slots = require("../models/slotBook");
const newBook = require('../models/newBook'); 
const Transporter = require("../config/nodemailer.js");
// const mailTransporter=nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//       user: 'vishnupriyakolatt@gmail.com',
//       pass: 'mbbfurrntmxzxwvn'
//     },
//   })
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

const Addslot = async (req, res) => {
  const { carno, email } = req.body;

  try {
    const OTP = generateOTP();
    const newSlot = new slots({
      carno: carno,
      slotno: OTP,
    });

    await newSlot.save();
console.log(newSlot)
    const mailDetails = {
      from: "vishnupriyakolatt@gmail.com",
      to: email,
      subject: "User Verification",
      html: `<p>Your OTP for registration is ${OTP}</p>`,
    };

 await Transporter.transporter.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to send OTP email" });
      } else {
        console.log("OTP mailed successfully");
        res.status(200).json({ msg: "Slot added successfully" });
      }
    });
  } catch (error) {
    console.error("Error in adding slot:", error);
    res.status(500).json(error);
  }
};



const newslot = async (req, res) => {
    const { carno, slotno, Lid, stime, etime } = req.body;

    try {
  
        const existingSlot = await slots.findOne({ slotno, carno });

        if (existingSlot) {
  
            const newBooking = new newBook({
                carno: carno,
                slotno: slotno,
                Lid: Lid,
                date: new Date(), 
                stime: stime,
                etime: etime,
            });

            await newBooking.save(); 

            res.status(200).json({ msg: 'Booking saved successfully' });
        } else {
   
            res.status(404).json({ error: 'Slot and car number not found' });
        }
    } catch (error) {
        console.error('Error in adding new slot:', error);
        res.status(500).json({ error: 'Failed to save booking' });
    }
};

module.exports = { newslot ,Addslot};

