import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderPage from './routes/OrderPage';
import './App.css';
import Login from './auth/Login';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route index element={<OrderPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

