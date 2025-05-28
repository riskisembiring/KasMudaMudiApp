import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AddIncomePage from "./pages/AddIncomePage";
import TransactionPage from "./pages/TransactionPage";
import LoginPage from "./pages/LoginPage"; // pastikan file ini ada

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state login

  const handleAdd = (data) => {
    setTransactions([...transactions, data]);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* Halaman Login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <LoginPage onLoginSuccess={handleLoginSuccess} />
          }
        />

        {/* Halaman Tambah Transaksi */}
        <Route
          path="/"
          element={
            isLoggedIn ? <AddIncomePage onAdd={handleAdd} /> : <Navigate to="/login" replace />
          }
        />

        {/* <Route path="/register" element={<RegisterPage />} /> */}

        {/* Halaman Daftar Transaksi */}
        <Route
          path="/transactions"
          element={
            isLoggedIn ? (
              <TransactionPage transactions={transactions} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
