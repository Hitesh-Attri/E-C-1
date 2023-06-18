const nodemailer = require("nodemailer");
const ethereal = require('./etherealCreds');

const sendEmail = async (req, mailToken, callback)=>{
    console.log(req.body, typeof req.body, " <<<")

    let userEmail = req.body.email;

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: ethereal.etherealEmail, 
            pass: ethereal.etherealPassword 
        },
      });

    let info = await transporter.sendMail({
        from: '"Bunty 👻" <bunty1@example.com>', // sender address
        // to: "bar@example.com, baz@example.com", // list of receivers
        to: userEmail, // list of receivers
        subject: "Verify your mail", // Subject line
        text: "Hello world?", // plain text body
        html: `
            <b>Hello ${req.body.usename}</b> <br> ${req.body.email}
            <br>
            <p>your password has been changed! </p>
        `, // html body
    });

    callback(info);   
}

module.exports = sendEmail;