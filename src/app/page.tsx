import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className='flex justify-center'>
        ExpenseShare+
      </div>
      
      <div className='flex justify-center'>
        <Link href='/login'>
          <button className='border border-gray-500 hover:border-gray-700 text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded'>
            Login!
          </button> 
        </Link>
        <Link href='/signup'>
          <button className='border border-gray-500 hover:border-gray-700 text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded'>
            Sign Up!
          </button> 
        </Link> 
      </div>
    </>
  )
}