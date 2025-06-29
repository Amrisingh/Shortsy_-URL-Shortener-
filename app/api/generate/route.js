import clientPromise from "@/lib/mongodb"

export async function POST(request) {

   const body = await request.json()

   const client = await clientPromise
   const db = client.db("Shortsy")
   const collection = db.collection("url")

   const result = collection.insertOne({
    url: body.url,
    shorturl: body.shorturl
   })

   const doc = await collection.findOne({shorturl: body.shorturl})
   if(doc){
    return Response.json({ success: false, error: true, message: 'URL already exist' })
   }
    return Response.json({ success: true, error: false, message: 'URL generated successfully' })
  }