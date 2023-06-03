// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../components/mariadbPool'
import { decodeCustomCampaignId } from '@/components/base64Utils';


export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    const { campaignId } = req.query;
    let decodedCampaignId = decodeCustomCampaignId(campaignId as string);
    let conn;
    let result;
    try {
        conn = await pool.getConnection();
        result = await conn.query("UPDATE maile SET url = 1 WHERE id_kampanii = ? AND email = ?", [decodedCampaignId.id, decodedCampaignId.email]);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    res.send(200)
}

