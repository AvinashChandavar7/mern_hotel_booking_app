import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import LogOutButton from './LogOutButton';

const Header = () => {

  const { isLoggedIn } = useAppContext();

  return (
    <div className='px-2 py-6 bg-blue-800'>
      <div className="container flex items-center justify-between mx-auto">
        <span className="text-xl font-bold tracking-tight text-white md:text-3xl">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className='flex space-x-2'>
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings"
                className="flex items-center px-3 font-bold text-white rounded-sm hover:text-blue-600 hover:bg-white">
                My Bookings
              </Link>

              <Link to="/my-hotels"
                className="flex items-center px-3 font-bold text-white rounded-sm hover:text-blue-600 hover:bg-white">
                My Hotels
              </Link>

              <LogOutButton />
            </>
          ) : (
            <Link to="/login" className="flex items-center px-4 py-2 font-bold text-blue-600 bg-white rounded-sm hover:bg-gray-100">
              Sign In
            </Link>
          )}

        </span>
      </div>
    </div>
  )
}

export default Header