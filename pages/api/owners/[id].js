import * as Owner from '../../../models/owner'

export default async function handler(req, res) {
    const id = req.query.id

    if (req.method === 'GET') { // find by id
        const owner = await Owner.show(id)

        return res.status(200).json({ data: owner })

    } else if (req.method === 'POST') { // update owner
        await Owner.update(id, req.body)

        return res.status(200).end()

    } else if (req.method === 'DELETE') { // remove owner
        await Owner.remove(id)

        return res.status(200).end()
    }
}