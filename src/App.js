import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" elemenet= {<Home/>}/>
       
       
       </Routes>


  </Router>
  );
}

export default App;
