import { MongoClient } from 'mongodb'



async function handler(req, res) {

  const mongodbUsername = process.env.NEXT_PUBLIC_MONGODB_USERNAME
  const mongodbPassword = process.env.NEXT_PUBLIC_MONGODB_PASSWORD

  if (req.method === 'POST') {
    const userEmail = req.body.email

    if (!userEmail) {
      res.status(422).json({ message: 'Invalid email address.' })
      return
    }

    const client = await MongoClient.connect(`mongodb+srv://${mongodbUsername}:${mongodbPassword}@cluster0.o7zvx.mongodb.net/events?retryWrites=true&w=majority`)
    const db = await client.db()
    await db.collection('emails').insertOne({ email: userEmail })



    client.close()

    console.log(userEmail)
    res.status(201).json({ message: 'Signed Up!' })
  }
}

export default handler