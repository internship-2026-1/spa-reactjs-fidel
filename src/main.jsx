import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
//import "./assets/styles/global.css";
import 'lib-components-react/style.css'
//funcion propia de redux
import { Provider } from 'react-redux'
//importo todo de store
import { store } from './store'

ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
)