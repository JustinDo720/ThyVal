import Introduction from "./Introduction";
import Validated from "./Validated";
import { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import "./App.css";

function App() {
  useEffect(()=>{
    document.title = 'My Valentines'
  })

  return (
    <>
      <Router basename="/ThyVal">
        <div className='background'>
          <Routes>
            <Route path='/' element={<Introduction/>}></Route>
            <Route path='/validated' element={<Validated/>}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
