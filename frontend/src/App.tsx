import { Navigate, Route, Routes, } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import Login from "./pages/Login"
import AddHotel from "./pages/AddHotel"
import { useAppContext } from "./contexts/AppContext"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import Search from "./pages/Search"
import HotelDetails from "./pages/HotelDetails"
import Booking from "./pages/Booking"
import MyBookings from "./pages/MyBookings"

const App = () => {

  const { isLoggedIn } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<Layout><p>Home Page</p></Layout>} />
      <Route path="/search" element={<Layout><Search /></Layout>} />
      <Route path="/detail/:hotelId" element={<Layout><HotelDetails /></Layout>} />

      <Route path="/register" element={<Layout><Register /></Layout>} />

      <Route path="/login" element={<Layout><Login /></Layout>} />

      {
        isLoggedIn && (
          <>
            <Route path="/hotel/:hotelId/booking" element={<Layout><Booking /></Layout>} />
            <Route path="/add-hotel" element={<Layout><AddHotel /></Layout>} />
            <Route path="/my-hotels" element={<Layout><MyHotels /></Layout>} />
            <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel /></Layout>} />
            <Route path="/my-bookings" element={<Layout><MyBookings /></Layout>} />
          </>
        )
      }

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App