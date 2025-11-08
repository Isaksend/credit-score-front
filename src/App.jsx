import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreditForm from "./pages/CreditForm";
import Profile from "./pages/Profile";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/form" element={<CreditForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<LoginPage />} /> {/* default route - индекс */}
            </Routes>
        </BrowserRouter>
    );
}
export default App;
