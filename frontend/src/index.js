import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'

let requiredPersistor = persistStore(store)

const app = document.getElementById('root');

// create a root
const root = createRoot(app);

//render app to root
root.render(<Provider store={store}>
  <PersistGate persistor={requiredPersistor}>
  <App />
  </PersistGate>
</Provider>);
