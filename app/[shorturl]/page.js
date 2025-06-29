import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"

export default async function Page({ params }) {

    const client = await clientPromise
    const db = client.db("Shortsy")
    const collection = db.collection("url")
    const { shorturl } = await params

    const doc = await collection.findOne({shorturl: shorturl})
   if(doc){
      redirect(doc.url)
   }

   else{
    redirect(`${process.env.NEXT_PUBLIC_HOST}`)
   }
  }