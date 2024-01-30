import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" elemenet= {<Home/>}/>
        <Route path="/Search" elemenet= {<Search/>}/>
       
       </Routes>


  </Router>
  );
}

export default App;
