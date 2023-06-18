const nodemailer = require("nodemailer");
const ethereal = require("./etherealCreds");

const sendEmail = async (userEmail)=>{
    let testAccount = await nodemailer.createTestAccount();

    // connect with the smtp
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: ethereal.etherealEmail, // this field can be different
            pass: ethereal.etherealPassword // this field can be different, Ethereal
        },
      });

      // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Bunty 👻" <bunty1@example.com>', // sender address
        // to: "bar@example.com, baz@example.com", // list of receivers
        to: userEmail, // list of receivers
        subject: "mail verified", // Subject line
        text: "Hello world?", // plain text body
        html: `
            <b>Hi this is bunty</b> <br> 
            ${userEmail}
            <br>
            Email verified.
            <a href="http://localhost:5000/login" target="_blank">Click here to Login!</a>
        `, // html body
    });
}

module.exports = sendEmail;