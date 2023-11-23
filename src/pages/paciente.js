import { useParams } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import '../styles/buscar.css'
import '../styles/paciente.css'
import SendPDF from '../components/pdf'

// import { Link, useNavigate } from 'react-router-dom'

export default function Paciente(route, props) {
  const { cpf } = useParams()
  console.log(cpf)

  const [paciente, setPaciente] = useState(null)

  // const [alertMessage, setAlertMessage] = useState('')

  const urlAPI = 'https://api-healthchain.onrender.com/usuarios'

  const buscarPaciente = async (cpf) => {
    if (!cpf) {
      return window.alert('Digite um CPF não nulo')
    }

    try {
      const response = await axios.get(`${urlAPI}/${cpf}`)
      const pacienteData = response.data

      if (pacienteData) {
        setPaciente(pacienteData)
        //setAlertMessage('')
      } else {
        setPaciente(null)
        //setAlertMessage('Nenhum paciente encontrado para o CPF informado.')
      }
    } catch (error) {
      console.error('Erro na busca de paciente:', error)
      console.log(paciente)
      setPaciente(null)
    }
  }

  if (cpf) {
    buscarPaciente(cpf)
  }

  return (
    <div className="buscar">
      <header className="header">
        <Link to="/">
          <img id="logo" src={logo} alt="logo"></img>
        </Link>
        <ul>
          <Link to="/buscarPacientes">
            <li className="links">Pacientes</li>
          </Link>

          <Link to="/chat">
            <li className="links">Chat</li>
          </Link>
        </ul>
      </header>
      <div className="subHeader">
        {paciente ? (
          <h1 className="pacientesh1">{paciente.nome}</h1>
        ) : (
          <p>Aguarde, buscando paciente...</p>
        )}
      </div>
      <main className="theMain">
        <SendPDF />
        <button className="Enviar">Enviar</button>

      </main>
    </div>
  )
}
