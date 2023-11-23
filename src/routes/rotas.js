import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Home from '../pages/home'
import Login from '../pages/loginMedico'
import CadastroMedico from '../pages/cadastroMedico'
import BuscarPacientes from '../pages/buscarPacientes'

import SendPDF from '../components/pdf'
import Paciente from '../pages/paciente'

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastroMedico" element={<CadastroMedico />} />
        <Route path="/buscarPacientes" element={<BuscarPacientes />} />
        <Route path="/paciente/:cpf" element={<Paciente />} />
        <Route path="/pdf" element={<SendPDF />}></Route>
        <Route path="*" to="/" />
      </Routes>
    </BrowserRouter>
  )
}
