import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StoreManagerDashboard from "./pages/StoreManagerDashboard";
import CreateStore from "./components/CreateStore";
import StoreForm from "./components/StoreForm";
import ProductList from "./components/ProductList";
import CreateProduct from "./components/CreateProduct";
import ManageProduct from "./components/ManageProduct";
import AdminProductList  from "./components/AdminProductList ";
import Layout from "./Layout";  // Import Layout

import MedicineList from "./components/MedicineList";
import OrderPage from "./components/OrderPage";
import OrderStatus from "./components/OrderStatus";
import StoreOrders from "./components/StoreOrders";
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Routes without Header and Footer */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Routes with Header and Footer */}
                <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
                <Route path="/store" element={<Layout><StoreManagerDashboard /></Layout>} />
                <Route path="/update" element={<Layout><CreateStore /></Layout>} />
                <Route path="/create-store" element={<Layout><StoreForm /></Layout>} />
                <Route path="/stores/:storeId/products" element={<Layout><AdminProductList /></Layout>} />

                {/* Product Management Routes */}
                <Route path="/products" element={<Layout><ProductList /></Layout>} />
                <Route path="/products/create" element={<Layout><CreateProduct /></Layout>} />
                <Route path="/products/manage/:id" element={<Layout><ManageProduct /></Layout>} />
                <Route path="/" element={<MedicineList />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/order-status" element={<OrderStatus />} />
                <Route path="/StoreOrders" element={<Layout><StoreOrders /></Layout>} />
            </Routes>
        </Router>
    );
};

export default App;