import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

export async function connectToDatabase() {
  const client = await clientPromise
  return client.db() // will use default DB from connection URI
}
