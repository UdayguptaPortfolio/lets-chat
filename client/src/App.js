import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MenuBar from './components/MenuBar';
import {Container} from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'


function App() {
  return (
    <Router>
      <Container>
      <MenuBar/>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='register' element={<Register/>}/>
      <Route exact path='login' element={<Login/>}/>
      </Routes>
      </Container>
    </Router>
    
  );
}

export default App;
