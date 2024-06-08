import Footer from './Components/Footer';
import Home from './Components/Home';
import Header from './Components/Header';

import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
            </Routes>
            <Footer/>
        </div>
    )
};

export default App;
