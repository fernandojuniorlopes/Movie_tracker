
import NavigationBar from './components/NavigationBar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

const Homepage = () => {
    return (
        <div>
            <NavigationBar />
            <h1>Welcome to the Homepage</h1>
            {/* Homepage content */}
        </div>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Homepage path="/"></Homepage>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;