import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path='/' element={<h1>hwllo</h1>} />
            <Route path='/add' element={<h1>add</h1>} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login/>} />
       
        </Routes>
      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;
