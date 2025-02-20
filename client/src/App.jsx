import './App.css'
import Home from './components/Home'
import AddComboForm from "./components/AddComboForm"
import WeirdCombosList from "./components/WeirdCombosList"
import {BrowserRouter as Router,Route, Routes } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/add' element={<AddComboForm/>}/>
        <Route path='/post' element={<WeirdCombosList/>}/>
      </Routes>
    </Router>


  )
}

export default App
