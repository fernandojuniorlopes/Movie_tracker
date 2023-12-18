
import NavigationBar from './components/NavigationBar';

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
        <Homepage></Homepage>
    );
}

export default App;