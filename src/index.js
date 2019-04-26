import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './App.jsx'
// import * as serviceWorker from './serviceWorker'

global.endpoint = (typeof window.endpoint === 'string') ? window.endpoint : 'localhost:4000'

// for test purposes
document.addEventListener('livedeck-app-ready', () => {
  setTimeout(() => {
    let event = new window.Event('livedeck-user-loaded')
    // event.data = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemF0aW9uIjoiMGJlZDk4OGQtNDRmMi00YjMxLWE4ZWMtODE2NDRmMDk0ZWQ1In0.8SKNJgKBfJwE6tHUuRr-vl2JoZMbovet7diqMnQfXQc'
    document.dispatchEvent(event)
  }, 5000)
})

ReactDOM.render(<App />, document.getElementById('root'))

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
