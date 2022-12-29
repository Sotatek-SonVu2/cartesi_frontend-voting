import ReactDOM from 'react-dom/client'
import { ReactNotifications } from 'react-notifications-component'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './store'
// CSS
import './index.css'
import 'css/table.css'
import 'react-notifications-component/dist/theme.css'
import 'react-datepicker/dist/react-datepicker.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<BrowserRouter>
			<ReactNotifications />
			<App />
		</BrowserRouter>
	</Provider>
	// </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
