import * as Owner from '../../../models/owner'

export default async function handler(req, res) {
    if (req.method === 'POST') { // insert new owner
        await Owner.create(req.body)
        
        return res.status(200).end()

    } else if (req.method === 'GET') { // get all owners
        const owners = await Owner.index()

        return res.status(200).json({ data: owners })
    }
}