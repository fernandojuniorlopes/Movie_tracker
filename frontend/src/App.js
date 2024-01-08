
import NavigationBar from './components/NavigationBar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Movie from './components/Movie';
import Profile from './components/Profile';

const Homepage = () => {
    return (
        <div>
            <h1>Welcome to homepage</h1>
        </div>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NavigationBar/>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/movie" element={<Movie/>}/>
                    <Route path="/list" element={<Profile/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;