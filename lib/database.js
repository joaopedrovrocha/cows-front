import { MongoClient } from 'mongodb'

let cachedClient = null
let cachedDb = null

const {
    MONGODB_HOST,
    MONGODB_DB,
    MONGODB_USER,
    MONGODB_PASSWORD
} = process.env

let MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DB}?retryWrites=true&w=majority`

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb
        }
    }

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    let client = new MongoClient(MONGODB_URI, opts)
    await client.connect()

    let db = client.db(MONGODB_DB)

    cachedClient = client
    cachedDb = db

    return { client, db }
}