import '../styles/form.css'
import '../styles/cadastro.css'
import '../styles/button.css'
import { useState } from 'react'
import axios from 'axios'
import logo from '../assets/logo.svg'

//import Button from '../components/button'

//const api = 'https://api-healthchain.onrender.com'

const initialState = {
  novoCadastro: {
    coren: 0,
    nome: '',
    email: '',
    senha: '',
    telefone: '',
  },
}
export default function CadastroEnfermeiro(props) {
  const [novoCadastro, setNovoCadastro] = useState(initialState.novoCadastro)

  function atualizarNovoCadastro(event) {
    const { name, value } = event.target

    console.log(name, value)

    setNovoCadastro({
      ...novoCadastro,
      [name]: value,
    })

    console.log(novoCadastro)
  }

  function enviarFormulario(event) {
    event.preventDefault()

    // converte de string pra number
    novoCadastro.crm = Number(novoCadastro.coren)

    console.log(novoCadastro)

    axios
      .post('https://api-healthchain.onrender.com/medicos', novoCadastro)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Erro ao fazer a solicitação:', error)
        // Trate o erro aqui
      })
  }

  return (
    <div className="Cadastro">
      <img id="logo" src={logo} alt="logo"></img>
      <div id="container">
        <div className="formulario">
          <form id="formLogin" onSubmit={enviarFormulario}>
            <label>Coren</label>
            <input
              type="text"
              className="inputText"
              name="coren"
              placeholder="12345"
              value={novoCadastro.coren}
              onChange={atualizarNovoCadastro}
            />

            <label>Nome</label>
            <input
              type="text"
              className="inputText"
              name="nome"
              placeholder="Seu nome"
              value={novoCadastro.nome}
              onChange={atualizarNovoCadastro}
            />

            <label>Email</label>
            <input
              type="text"
              className="inputText"
              name="email"
              placeholder="example@email.com"
              value={novoCadastro.email}
              onChange={atualizarNovoCadastro}
            />

            <label>Senha</label>
            <input
              type="password"
              className="inputText"
              name="senha"
              placeholder="**********"
              value={novoCadastro.senha}
              onChange={atualizarNovoCadastro}
            />

            <label>Telefone</label>
            <input
              type="text"
              className="inputText"
              name="telefone"
              placeholder="000000000"
              value={novoCadastro.telefone}
              onChange={atualizarNovoCadastro}
            />

            <button id="botaozin" onClick={(e) => enviarFormulario(e)}>
              Cadastrar
            </button>
            <p>
              Já tem uma conta?{' '}
              <strong>
                {' '}
                <a href="https://www.instagram.com/kauan_fernandes8/">
                  Fazer login
                </a>
              </strong>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
