import { Navigate, Route, Routes, } from "react-router-dom"
import Layout from "./layouts/Layout"

const App = () => {
  return (
    <Routes>
      <Route path="/"
        element={<Layout><p>Home Page</p></Layout>}
      />
      <Route path="/search"
        element={<Layout><p>Home Page</p></Layout>}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App