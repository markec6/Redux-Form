import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import store from '../src/redux/store.js'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import HomePage from './Pages/HomePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
      children: [{
        path: '/',
        element: <HomePage/>,
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/> 
    </Provider> 
  </StrictMode>,
)
// struktura kada koristimo i router i redux 
// router je uvek umesto app obmotan reduxom