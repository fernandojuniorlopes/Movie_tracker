
import NavigationBar from './components/NavigationBar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Movie from './components/Movie';
import Profile from './components/Profile';
import Homepage from './components/Homepage';
import Analytics from './components/Analytics';
import './styles/main.css'
import MoviePage from './components/MoviePage';
import Footer from './components/Footer'
import MovieLists from './components/MovieLists';

const App = () => {
    return (
        <div className='home-page'>
            <BrowserRouter>
                <AuthProvider>
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
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;