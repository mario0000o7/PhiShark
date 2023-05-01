// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../components/mariadbPool'


export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    const { campaignId } = req.query;
    let conn;
    let result;
    try {
        conn = await pool.getConnection();
        result = await conn.query("SELECT * FROM maile WHERE id_kampanii = ?", [id]);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    res.status(200).json(result)
}


