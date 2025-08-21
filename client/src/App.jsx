import './App.css'
import Home from './components/Home'
import AddComboForm from "./components/AddComboForm"
import WeirdCombosList from "./components/WeirdCombosList"
import EditComboForm from "./components/EditComboForm"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from "./components/Profile"
import {BrowserRouter as Router,Route, Routes } from "react-router-dom";
import { useState } from 'react'


function App() {
  const [combos, setCombos] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={
          <ProtectedRoute>
            <AddComboForm onComboAdded={(newCombo) => setCombos([...combos, newCombo])}/>
          </ProtectedRoute>
        }/>
        <Route path='/post' element={
          <ProtectedRoute>
            <WeirdCombosList combos={combos}/>
          </ProtectedRoute>
        }/>
        <Route path='/edit/:id' element={
          <ProtectedRoute>
            <EditComboForm />
          </ProtectedRoute>
        } />
        <Route path='/login' element={<LoginForm onLogin={setUser}/>} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App
