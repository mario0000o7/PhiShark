// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
var nodemailer = require('nodemailer');


export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }    
    const body = req.body
    console.log(body)
    var transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        }
    });
    for (let i = 0; i < body.length; i++) {
        if(body[i].skradzione_dane == 0 && body[i].zalacznik == 0 && body[i].url == 0) continue
        var mailText = 'Dzień dobry,\n\n Wykryliśmy, że dałeś się złapać na mail phishingowy wysłany w ramach antyphishingowej kampanii.\n Czynności które wykonałeś: \n'
        if(body[i].url == 1) mailText += '- kliknięcie w link\n'
        if(body[i].zalacznik == 1) mailText += '- otwarcie załącznika\n'
        if(body[i].skradzione_dane == 1) mailText += '- podanie danych\n'
        mailText += 'Chroń bezpieczeństwo swoich danych w sieci!\n\n Pozdrawiamy, \n Zespół PhishingShield'
        var mailOptions = {
            from: process.env.SMTP_USER,
            to: body[i].email,
            subject: 'Ostrzeżenie',
            text: mailText
        };
        transporter.sendMail(mailOptions, function(error: any, info: { response: string; }){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
    }
     
    res.status(200)
}


