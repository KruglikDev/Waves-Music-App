import { createRoot } from 'react-dom/client';
import App from './App';
// import { StrictMode } from 'react';
import reportWebVitals from './reportWebVitals';
import './styles/main.scss';

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
