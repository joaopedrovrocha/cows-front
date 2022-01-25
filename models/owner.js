import { connectToDatabase  } from "../lib/database"
import { ObjectId  } from "mongodb"

const COLLECTION = 'owner'

export async function index() {
    const { db } = await connectToDatabase()

    return await db
        .collection(COLLECTION)
        .find({})
        .toArray()
}

export async function create(data) {
    const { db } = await connectToDatabase()

    return await db
        .collection(COLLECTION)
        .insertOne(data)
}

export async function show(id) {
    const { db } = await connectToDatabase()

    return await db
        .collection(COLLECTION)
        .findOne({ _id: new ObjectId(id) })
}

export async function update(id, data) {
    const { db } = await connectToDatabase()

    delete data['_id']

    return await db
        .collection(COLLECTION)
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        )
}

export async function remove(id) {
    const { db } = await connectToDatabase()

    return await db
        .collection(COLLECTION)
        .deleteOne({
            _id: new ObjectId(id)
        })
}