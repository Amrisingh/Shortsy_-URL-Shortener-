"use client"
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle, Link as LinkIcon } from "lucide-react";

const Shorten = () => {
  const [url, seturl] = useState("")
  const [shorturl, setshorturl] = useState("")
  const [generated, setgenerated] = useState("")

  const generate = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "url": url,
      "shorturl": shorturl
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        seturl("")
        setshorturl("")
        if(result.success){setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)}
        else{setgenerated("")}
        console.log(result)
        alert(result.message)
      })
      
      .catch((error) => console.error(error));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LinkIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Generate your short URLs
            </h1>
            <p className="text-xl text-gray-600">
              Transform your long URLs into short, shareable links
            </p>
          </div>

          {/* Main Form Card */}
          <div className='bg-white shadow-2xl rounded-3xl p-8 lg:p-10 border border-gray-100'>
            <div className='flex flex-col gap-6'>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Enter your URL here
                </label>
                <input 
                  type="text" 
                  placeholder='https://example.com/your-very-long-url-that-needs-shortening'
                  value={url}
                  className='w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all duration-200'
                  onChange={(e) => { seturl(e.target.value) }} 
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Enter your Preferred short URL Text
                </label>
                <input 
                  type="text" 
                  placeholder='Preferred short URL text'
                  className='w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all duration-200'
                  value={shorturl}
                  onChange={(e) => { setshorturl(e.target.value) }} 
                />
              </div>

              <button 
                onClick={generate} 
                className='w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl shadow-lg mt-4 '
              >
                Generate
              </button>
            </div>
            
            {/* Generated URL Display */}
            {generated && (
              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-800">Success! Your short URL is ready</h3>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-3">Your shortened URL:</p>
                  <code className="block text-lg font-mono text-sky-600 bg-sky-50 px-4 py-3 rounded-lg border border-sky-200 break-all">
                    <Link href={generated} className="hover:underline" target="_blank">
                      {generated}
                    </Link>
                  </code>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shorten