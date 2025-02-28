import './App.css'
import Home from './components/Home'
import AddComboForm from "./components/AddComboForm"
import WeirdCombosList from "./components/WeirdCombosList"
import {BrowserRouter as Router,Route, Routes } from "react-router-dom";
import { useState } from 'react'


function App() {

  const [combos, setCombos] = useState([])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<AddComboForm onComboAdded={(newCombo) => setCombos([...combos, newCombo])}/>}/>
        <Route path='/post' element={<WeirdCombosList combos={combos}/>}/>
      </Routes>
    </Router>


  )
}

export default App
