import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Layout, Footer } from './shared/ui';
import { ToastProvider } from './shared/ui/Toast';
import { 
  HomePage, 
  CartPage, 
  CheckoutPage, 
  ProductDetailPage,
  TransactionsPage 
} from './pages/index.ts';

import './styles/globals.css';

/**
 * App Component - Root component
 * Componente raíz de la aplicación
 */
const App = () => {
  return (
    <ToastProvider>
      <Router>
        <Layout>
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/products" element={<HomePage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
        </Layout>
      </Router>
    </ToastProvider>
  );
};

export default App;