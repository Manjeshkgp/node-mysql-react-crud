import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Pagination from './Pagination';
const app = document.getElementById('root');

// create a root
const root = createRoot(app);

//create router
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/pagination",
    element:<Pagination/>    
  }
])

//render app to root
root.render(
<Provider store={store}>
<RouterProvider router={router}>
</RouterProvider>
</Provider>);
