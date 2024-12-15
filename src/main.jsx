import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Importer le Provider
import { store } from './store'; // Importer le store Redux
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Fournir le store Redux */}
      <App />
    </Provider>
  </StrictMode>
);
