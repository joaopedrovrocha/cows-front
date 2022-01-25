import * as Cow from '../../../models/cow'

export default async function handler(req, res) {
    const id = req.query.id

    if (req.method === 'GET') { // find by id
        const cow = await Cow.show(id)

        return res.status(200).json({ data: cow })

    } else if (req.method === 'POST') { // update cow
        await Cow.update(id, req.body)

        return res.status(200).end()

    } else if (req.method === 'DELETE') { // remove cow
        await Cow.remove(id)

        return res.status(200).end()
    }
}