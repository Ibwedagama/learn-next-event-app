import { MongoClient } from 'mongodb'

const mongodbUsername = process.env.NEXT_PUBLIC_MONGODB_USERNAME
const mongodbPassword = process.env.NEXT_PUBLIC_MONGODB_PASSWORD

const client = await MongoClient.connect(`mongodb+srv://${mongodbUsername}:${mongodbPassword}@cluster0.o7zvx.mongodb.net/events?retryWrites=true&w=majority`)
const db = client.db()

async function handler(req, res) {
  const eventId = req.query.eventId

  if (req.method === 'POST') {
    // add server side validation

    const { email, name, text } = req.body

    if (!email || !name || !text || !email.include('@')) {
      res.status(422).json({ mesage: 'Invalid Input!' })
      return
    }

    console.log(email, name, text)

    const newComment = {
      email: email,
      name: name,
      text: text,
      eventId: eventId
    }

    const result = await db.collection('comments').insertOne(newComment)
    console.log(result)

    newComment.id = result.insertedId

    client.close()

    res.status(201).json({ message: 'Added comments', comment: newComment })
  }
  else if (req.method === 'GET') {

    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray()

    
  }
}

export default handler