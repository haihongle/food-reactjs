import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './styles/MainStyle.module.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<CookiesProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</CookiesProvider>
	</React.StrictMode>
);
reportWebVitals();
