import React from "react"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { Home, CreatePost } from "./pages"
import { logo } from "./assets"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
function App() {

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center px-2 sm:px-8 py-2 bg-white border-b-2 border-b-[#F1F1F4] ">
        <Link to={"/"}>
          <img src={logo} alt="Pillu" className="h-12 w-full object-contain " />
        </Link>
        <Link to={"/create-post"}>
          <p className="px-8 py-3 rounded-full bg-blue-500 text-white ">Create Post</p>
        </Link>
      </header>
      <main className="sm:px-8 px-4 py-4 w-full min-h-[calc(100vh-28px)] bg-white">
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>


    </BrowserRouter>
  )
}

export default App
