// import { Link } from 'react-router-dom';
// import { useAppContext } from '../contexts/AppContext';
// import LogOutButton from './LogOutButton';
// import ThemeToggleButton from './ThemeToggleButton';

// const Header = () => {

//   const { isLoggedIn } = useAppContext();


//   return (
//     <div className='w-full px-2 py-6 bg-blue-800'>
//       <div className="container flex flex-col items-center justify-between gap-5 mx-auto md:flex-row">
//         <span className="text-xl font-bold tracking-tight text-white md:text-3xl">
//           <Link to="/">MernHolidays</Link>
//         </span>
//         <div className='flex justify-end w-full space-x-2 border'>
//           {isLoggedIn ? (
//             <>
//               <Link to="/my-bookings"
//                 className="flex items-center px-3 text-sm font-bold text-white rounded-sm hover:text-blue-600 hover:bg-white">
//                 My Bookings
//               </Link>

//               <Link to="/my-hotels"
//                 className="flex items-center px-3 text-sm font-bold text-white rounded-sm hover:text-blue-600 hover:bg-white">
//                 My Hotels
//               </Link>

//               <ThemeToggleButton />

//               <LogOutButton />
//             </>
//           ) : (
//             <div className='flex flex-1 w-full gap-5 border'>
//               <ThemeToggleButton />
//               <Link to="/login" className="flex items-center px-4 py-2 font-bold text-blue-600 bg-white rounded-sm hover:bg-gray-100">
//                 Sign In
//               </Link>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Header
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import LogOutButton from './LogOutButton';
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className='w-full px-2 py-2 bg-blue-800'>
      <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
        <span className="text-xl font-bold tracking-tight text-white md:text-3xl">
          <Link to="/" className="text-white">MernHolidays</Link>
        </span>
        <div className='flex items-center justify-center w-full space-x-2 md:justify-end'>
          {isLoggedIn ? (
            <>

              <ThemeToggleButton />

              <Link to="/my-bookings"
                className="flex items-center px-3 py-2 text-sm font-bold text-white rounded-sm hover:text-blue-600 hover:bg-white"
              >
                My Bookings
              </Link>

              <Link to="/my-hotels"
                className="flex items-center px-3 py-2 text-sm font-bold text-white rounded-sm hover:text-blue-600 hover:bg-white"
              >
                My Hotels
              </Link>

              <LogOutButton />
            </>
          ) : (
            <div className='flex items-center justify-center space-x-2'>
              <ThemeToggleButton />
              <Link to="/login" className="px-4 py-2 font-bold text-blue-600 bg-white rounded-sm header-link hover:bg-gray-100">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
