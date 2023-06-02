import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './Pages/css/App.scss';
import Home from './Pages/Home';
import Play from './Pages/Play';

function App() {
  return (
    <>
    <div className="container">
        <h1 className="text-center mt-5">Youtube Channel Bingo</h1>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/play" element={ <Play /> }/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
    
  );
}

export default App;
