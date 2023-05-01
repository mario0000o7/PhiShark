// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../components/mariadbPool'
import nodemailer from "nodemailer"
import { createCustomCampaignId, decodeCustomCampaignId } from '@/components/base64Utils'

type EmailPayload = {
  to: string
  subject: string
  html: string
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

  return await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    ...data,
  })
}



export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    let conn;
    let result;
    console.log("Sending email...")
    // await sendEmail({
    //     to: "tobiasz@kstrzva.pl",
    //     subject: "Welcome to NextAPI",
    //     html: "Hello, this is a test email from NextAPI",
    // });
    let campaignId = createCustomCampaignId(1, "tobiasz@kstrzva.pl")
    
    return res.status(200).json({ message: "Email sent successfully", campaignId: campaignId, capmaignDecoded: decodeCustomCampaignId(campaignId) });
    //res.status(200).json(result)
}


