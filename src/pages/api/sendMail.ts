// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../components/mariadbPool'
import nodemailer from "nodemailer"
import { createCustomCampaignId, decodeCustomCampaignId } from '@/components/base64Utils'

type EmailPayload = {
  to: string
  subject: string
  html: string
  from: string
}

// Replace with your SMTP credentials
const smtpOptions = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    // tls: {
    //     ciphers:'SSLv3'
    // }
}

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
    })

  return await transporter.sendMail({...data})
}



export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    let conn: any;
    let result;
    let campaignId: number;
    console.log("Sending email...")
    console.log(req.body)
    req.body.name = "Kampania testowa223421227"

    try {
      conn = await pool.getConnection();
      result = await conn.query("INSERT INTO kampanie (nazwa, zalacznik, url) VALUES (?, 'none', 'none')", [req.body.name]);
      result = await conn.query("SELECT * FROM kampanie WHERE nazwa = ?", [req.body.name]);
      campaignId = result[0].id;
    } finally {
      if (conn) await conn.end(); //release to pool
    }
    try{
      conn = await pool.getConnection();
      let mails = req.body.selectedMails
      req.body.mails.forEach(async (mail: string) => {
        await sendEmail({
          from: req.body.mail,
          to: mail,
          subject: "Powiadomienie",
          html: req.body.mailContent.replace("{{campaignLink}}", `<a href="localhost:3000/raport.html?campaignId=${createCustomCampaignId(campaignId, mail)}"> ${req.body.url}</a>`)
        });
        result = await conn.query("INSERT INTO maile (id_kampanii, email) VALUES (?, ?)", [campaignId, mail]);
    })}
    finally {
      if (conn) await conn.end(); //release to pool
    }  
    //return res.status(200).json({ message: "Email sent successfully", campaignId: campaignId, capmaignDecoded: decodeCustomCampaignId(campaignId) });
    return res.status(200);
}


