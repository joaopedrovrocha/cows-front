import * as Cow from '../../../models/cow'

export default async function handler(req, res) {
    if (req.method === 'POST') { // insert new cow
        await Cow.create(req.body)
        
        return res.status(200).end()

    } else if (req.method === 'GET') { // get all cows
        const cows = await Cow.index()

        return res.status(200).json({ data: cows })
    }
}