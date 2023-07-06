import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Additional Modules
import "../node_modules/video-react/dist/video-react.css";
import "../node_modules/video-react/dist/video-react.css";
import "../node_modules/spectre.css/dist/spectre.css";
import "../node_modules/spectre.css/dist/spectre-icons.css";
import "./stylesheet/smu-hci.css"
import "./stylesheet/customad-specific.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
// Only use StrictMode in debugging. It will cause logging to run twice.
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
