import './App.css';
import Homepage from './components/HomePage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import BookingPage from './components/BookingPage';
import ConfirmedBooking from './components/ConfirmedBooking';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/booking" element={<BookingPage/>}/>
          <Route path="/confirmation" element={<ConfirmedBooking/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;


