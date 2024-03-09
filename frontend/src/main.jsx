import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store.js'
import { Provider } from 'react-redux';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// const queryClient = new QueryClient(); 

ReactDOM.createRoot(document.getElementById('root')).render(
  // <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  // </QueryClientProvider>
);
