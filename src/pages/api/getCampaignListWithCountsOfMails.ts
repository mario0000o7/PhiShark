// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../components/mariadbPool'


export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    let conn;
    let result;
    try {
        conn = await pool.getConnection();
        result = await conn.query("select k.id,nazwa nazwa_kampanii,count(nazwa) ilosc_mailii from maile join kampanie k on k.id = maile.id_kampanii group by nazwa");
        console.log(result)
        //@ts-ignore
        BigInt.prototype.toJSON = function() { return this.toString() }
    } finally {
        if (conn) conn.release(); //release to pool
    }
    res.status(200).json(result)
}


