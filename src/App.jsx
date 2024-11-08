import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './App.css'

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/not-found",
    element: <NotFound />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
