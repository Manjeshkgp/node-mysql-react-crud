import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'
const app = document.getElementById('root');

// create a root
const root = createRoot(app);

//render app to root
root.render(<Provider store={store}>
  <App />
</Provider>);
