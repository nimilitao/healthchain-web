import React, { useState } from 'react'
import axios from 'axios'
import logo from '../assets/logo.svg'

import '../styles/buscar.css'

import { Link, useNavigate } from 'react-router-dom'

export default function BuscarPacientes(props) {
  const [searchCpf, setSearchCpf] = useState('')
  const [paciente, setPaciente] = useState(null)

  const navigate = useNavigate()
  // const [alertMessage, setAlertMessage] = useState('')

  const urlAPI = 'https://api-healthchain.onrender.com/usuarios'

  const buscarPaciente = async (cpf) => {
    if (!cpf) {
      return window.alert('Digite um CPF não nulo')
    }

    try {
      const response = await axios.get(`${urlAPI}/${cpf}`)
      const pacienteData = response.data
      console.log(pacienteData)

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
      clearInputAndAlert()
      window.alert('Digite um CPF válido!')
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && searchCpf) {
      event.preventDefault() // Impede o envio do formulário
      buscarPaciente(searchCpf)
    }
  }

  const verPerfil = (cpf) => {
    // window.location.href = 'http://localhost:3000/paciente/' + cpf
    navigate(`/paciente/${cpf}`)
  }

  const clearInputAndAlert = () => {
    setSearchCpf('')
    setPaciente(null)
    //setAlertMessage('')
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
        <h1 className="pacientesh1">Pacientes</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            buscarPaciente(searchCpf)
          }}
        >
          <input
            className="txtBuscar"
            type="text"
            name="txtBuscar"
            placeholder="Buscar paciente (CPF)"
            value={searchCpf}
            onChange={(e) => setSearchCpf(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </form>
      </div>
      <main>
        {paciente !== null ? (
          <div className="cardPacientes">
            <div className="infosPaciente">
              <h2 className="nomeh2">{paciente.nome}</h2>
              <h3 className="nomeh3">{paciente.hospital}</h3>
            </div>

            <button className="seeUser" onClick={() => verPerfil(paciente.cpf)}>
              Ver Usuário
            </button>
          </div>
        ) : (
          <p
            className="nomeh2"
            style={{ marginLeft: '10%', marginRight: '10%' }}
          >
            Busque um paciente
          </p> // Texto padrão quando nenhum paciente foi encontrado
        )}
      </main>
    </div>
  )
}
