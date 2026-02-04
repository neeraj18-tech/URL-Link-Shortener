import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

const ErrorPage = ({message}) => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-6'>
            <FaExclamationTriangle className='text-8xl text-red-500 mb-4'/>
            <h1 className='text-3xl font-bold mb-2 text-gray-800'>Oops! Something went wrong</h1>
            <p className='text-gray-600 mb-6 text-center'>
                {message?message:"An unexpected error occurred"}
            </p>
            <button
            onClick={() => window.location.href = "/"}
            className='bg-custom-gradient text-white px-6 py-2 rounded-lg hover:bg-custom-gradient-2 transition-colors duration-200'
            >
                Go Back to Home
            </button>
        </div>
    )
}

export default ErrorPage