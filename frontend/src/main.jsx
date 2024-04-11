import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store.js'
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-tailwind/react';
import { SocketProvider } from './SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <ThemeProvider>
            <SocketProvider>
            <App />
            </SocketProvider>
          </ThemeProvider>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
);
