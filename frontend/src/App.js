
import NavigationBar from './components/NavigationBar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './components/Pages/ProfilePage';
import Homepage from './components/Pages/HomePage';
import Analytics from './components/Analytics';
import './styles/main.css'
import MoviePage from './components/Pages/MoviePage';
import Footer from './components/Footer'
import MovieLists from './components/Pages/MovieListPage';
import { APIProvider } from './contexts/APIContext';
import { BackendProvider } from './contexts/BackendContext';

const App = () => {
    return (
        <div className='home-page'>
            <BrowserRouter>
                <APIProvider>
                <AuthProvider>
                <BackendProvider>
                    <NavigationBar />
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/movie" element={<MovieLists />} />
                        <Route path="/movies/:id?" element={<MoviePage/>} />
                        <Route path="/list" element={<Profile />} />
                        <Route path="/analytics" element={<Analytics />} />
                    </Routes>
                    <Footer/>
                </BackendProvider>
                </AuthProvider>
                </APIProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;