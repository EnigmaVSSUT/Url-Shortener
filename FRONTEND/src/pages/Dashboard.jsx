import React from 'react'
import UrlForm from '../components/urlForm'
import UserUrls from '../components/Userurls'

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          URL Shortener
        </h1>
        <UrlForm />
        <UserUrls/>
      </div>
    </div>
  )
}

export default DashboardPage
