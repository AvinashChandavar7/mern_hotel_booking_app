import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className='py-10 bg-blue-800'>
      <div className="container flex flex-col items-center justify-between mx-auto md:flex-row gap-15">
        <span className="font-bold tracking-tight text-white text-md md:text-2xl">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className='flex gap-4 font-bold tracking-tight text-white'>
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  )
}

export default Footer