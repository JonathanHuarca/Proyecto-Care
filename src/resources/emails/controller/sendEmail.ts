import catchAsync from "../../../utils/catchAsync";
import nodeMailer from 'nodemailer'
import { sendEmail } from ".";

const errorMessage: String = "Error en send email test controller";

const sendEmailTest = () => catchAsync( errorMessage, async ( req, res ) => {
    const transporter = nodeMailer.createTransport(
        /*
        Con google : para poder enviar emails desde este proyecto debes habilitar el acceso a apps menos seguras en este link;

        https://www.google.com/settings/security/lesssecureapps
        */
        {
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
              user: "@gmail.com", //email
              pass: "contra123" //password
            }
        }
    )

    
         let message = {
        // Comma separated list of recipients
        to: 'Andris Reinman <tuemail@outlook.com>',

        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔',

        // plaintext body
        text: 'Hello to myself!',

        // HTML body
        html:
            '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
            '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',

        // An array of attachments
        attachments: [
            // String attachment
            {
                filename: 'notes.txt',
                content: 'Some notes about this e-mail',
                contentType: 'text/plain' // optional, would be detected from the filename
            },

            /*// Binary Buffer attachment
            {
                filename: 'image.png',
                content: Buffer.from(
                    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                        '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                        'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                    'base64'
                ),

                cid: 'note@example.com' // should be as unique as possible
            },*/

            /*// File Stream attachment
            {
                filename: 'nyan cat ✔.gif',
                path: __dirname + '/assets/nyan.gif',
                cid: 'nyan@example.com' // should be as unique as possible
            }*/
        ]
    }; 
    const send = await transporter.sendMail(message)
    console.log(send)
    res.status(200).json({
        message : " Email enviado"
    })
});

export default sendEmailTest;
