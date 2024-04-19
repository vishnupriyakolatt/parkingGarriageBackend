const slots= require("../models/slotBook");
const nodemailer = require('nodemailer');

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

        const mailDetails = {
            from: "vishnupriyakolatt@gmail.com",
            to: email, 
            subject: "User Verification",
            html: `<p>Your OTP for registration is ${OTP}</p>`, 
        };

        nodemailer.mailTransporter.sendMail(mailDetails, (err, data) => {
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

module.exports = Addslot;
