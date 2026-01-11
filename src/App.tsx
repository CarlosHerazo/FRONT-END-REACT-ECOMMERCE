import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Layout, Footer } from './shared/ui';
import { HomePage } from './pages/Home/HomePage';
import { ProductDetailPage } from './pages/ProductDetail';
import { CartPage } from './pages/Cart/CartPage';

import './styles/globals.css';

/**
 * App Component - Root component
 * Componente raíz de la aplicación
 */
const App = () => {
  return (
    <Router>
      <Layout>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;