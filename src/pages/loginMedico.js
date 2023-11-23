import logo from '../assets/logotipo.svg'

import '../styles/login.css'
import '../styles/form.css'
import '../styles/button.css'

import { useState } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

const initialState = {
  novoLogin: { crm: '', senha: '' },
  mensagem: '', // Adiciona um campo para a mensagem
}

document.title = 'Login | Médicos'

export default function LoginMedico() {
  const [novoLogin, setNovoLogin] = useState(initialState.novoLogin)
  // const navigate = useNavigate()

  function atualizarNovoLogin(event) {
    const { name, value } = event.target

    console.log(name, value)

    setNovoLogin({
      ...novoLogin,
      [name]: value,
    })

    console.log(novoLogin)
  }

  async function logar(event) {
    event.preventDefault()
    try {
      const response = await axios.post(
        'https://api-healthchain.onrender.com/medicos/login',
        novoLogin
      )

      // Verifica se o login foi bem-sucedido com base na resposta da API
      if (response.data.success) {
        // Define uma mensagem de sucesso
        setNovoLogin({
          ...novoLogin,
          mensagem: 'Login bem-sucedido: ' + response.data.message,


        })
      } else {
        // Define uma mensagem de erro da API
        setNovoLogin({
          ...novoLogin,
          mensagem: 'Erro de login: ' + response.data.message,
        })
      }
    } catch (error) {
      // Trata os erros da chamada da API
      setNovoLogin({
        ...novoLogin,
        mensagem: 'Erro ao conectar à API: ' + error.message,
      })
    }
  }

  return (
    <div className="Login">
      <img id="logo" src={logo} alt="logo"></img>
      <div id="container">
        <div className="formulario">
          <form id="formLogin" onSubmit={logar}>
            <label>CRM</label>
            <input
              type="text"
              className="inputText"
              name="crm"
              placeholder="00000"
              value={novoLogin.crm}
              onChange={atualizarNovoLogin}
            />

            <label>Senha</label>
            <input
              type="password"
              className="inputText"
              name="senha"
              placeholder="**********"
              value={novoLogin.senha}
              onChange={atualizarNovoLogin}
            />
z
            <button className="botaozin" onClick={(e) => logar(e)}>
              Entrar
            </button>

            {novoLogin.mensagem && <p>{novoLogin.mensagem}</p>}

            <p>
              Não tem uma conta?{' '}
              <strong>
                {' '}
                <a href="/cadastroMedico">Cadastrar</a>
              </strong>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
