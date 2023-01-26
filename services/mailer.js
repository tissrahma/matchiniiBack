import nodemailer from'nodemailer';
import User from "../models/use.js";
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'khitem.mathlouthi@esprit.tn',
		  pass: 'loicfhwbjlkevfqg'
  }
});

export async function sendmailresetpassword(login ,  password) {
	
  console.log("hhhhhhhhhh" , login)
  var mailOptions = {
    to: login,
				from: 'khitem.mathlouthi@esprit.tn',
    subject: 'Sending Email using Node.js',
    text: `here is the the validation code to reset your password, ${password}`
     
  } ;

  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}