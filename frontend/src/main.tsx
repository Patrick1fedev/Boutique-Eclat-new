import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import { CartProvider } from './Context/CartContext';
import { ProductsProvider } from './Context/ProductsContext';
import { FavoritesProvider } from './Context/FavsContext';


const root = document.getElementById('root');
if(!root) throw new Error('Root element not found');
ReactDOM.createRoot(root).render(
    <ProductsProvider>
        <UserProvider>
            <CartProvider>
                <FavoritesProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </FavoritesProvider>
            </CartProvider>
        </UserProvider>
    </ProductsProvider>
);
