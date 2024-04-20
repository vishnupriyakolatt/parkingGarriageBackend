const slots = require("../models/slotBook");
const newBook = require("../models/newBook");
const Transporter = require("../config/nodemailer.js");

//Random number generation here
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

//Adding slot
const Addslot = async (req, res) => {
  const { carno, email } = req.body;

  try {
    const OTP = generateOTP();
    const newSlot = new slots({
      carno: carno,
      slotno: OTP,
    });

    await newSlot.save();
    console.log(newSlot);
    const mailDetails = {
      from: "vishnupriyakolatt@gmail.com",
      to: email,
      subject: "Greetings from PARKIOslot - Slot Details(call this number get exact location)",
    html: `
    <p>..................................LOCATION DETAILS.....................................................</p>
        <p>Location1: KL001, Kozhikode-17 mobile:900888</p>
        <p>Location2: ML001, Malappuram-17 mobile:655444</p>
        <p>Location3: KKL001, Kannur-17 mobile:788834</p>
        <p>Location4: TL001, Trivandrum-17 mobile:2446789</p>
        <p>Location5: IL001, Idukki-17 mobile:90955</p>
        <p>Location6: EL001, Ernakkulam-17 mobile:678990</p>
        
        <p>.......................................................................................</p>
        <p>Slot number for parking ${carno} is ${OTP}</p>
    `,

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

//Booking confirmation  here
const newslot = async (req, res) => {
  const { carno, slotno, stime, etime } = req.body;
  console.log(req.body);

  try {
    const existingSlot = await slots.findOne({ slotno, carno });
    console.log("exist" + existingSlot);
    if (existingSlot) {
      const newBooking = new newBook({
        carno: carno,
        slotno: slotno,
        stime: stime,
        etime: etime,
      });

      await newBooking.save();

      res.status(200).json({ msg: "Booking saved successfully" });
    } else {
      res.status(404).json({ error: "Slot and car number not found" });
    }
  } catch (error) {
    console.error("Error in adding new slot:", error);
    res.status(500).json({ error: "Failed to save booking" });
  }
};

module.exports = { newslot, Addslot };
