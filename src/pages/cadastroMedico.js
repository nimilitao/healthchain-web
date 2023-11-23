import '../styles/form.css'
import '../styles/cadastro.css'
import '../styles/button.css'
import { useState } from 'react'
// import { useHistory} from 'react-router-dom'
// import {BrowserRouter} from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.svg'

//import Button from '../components/button'

//const api = 'https://api-healthchain.onrender.com'

const initialState = {
  novoCadastro: {
    crm: '',
    nome: '',
    email: '',
    senha: '',
    telefone: '',
  },
}
export default function CadastroMedico(props) {
  const [novoCadastro, setNovoCadastro] = useState(initialState.novoCadastro)
  // const history = useHistory()

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

    console.log(novoCadastro)

    axios
      .post('https://api-healthchain.onrender.com/medicos', novoCadastro)
      .then((response) => {

        window.alert('Médico cadastrado!')
        console.log('Usuário: ' + response.data)
        // history.push('/home')
      })
      .catch((error) => {
        console.error('Erro ao fazer a solicitação:', error)
      })
  }

  return (
    //<BrowserRouter>
      <div className="Cadastro">
        <img id="logo" src={logo} alt="logo"></img>
        <div id="container">
          <div className="formulario">
            <form id="formLogin" onSubmit={enviarFormulario}>
              <label>CRM</label>
              <input
                type="text"
                className="inputText"
                name="crm"
                placeholder="12345"
                value={novoCadastro.crm}
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

              <button className="botaozin" onClick={(e) => enviarFormulario(e)}>
                Cadastrar
              </button>
              <p>
                Já tem uma conta?{' '}
                <strong>
                  {' '}
                  <a href="/login">
                    Fazer login
                  </a>
                </strong>
              </p>
            </form>
          </div>
        </div>
      </div>
    //</BrowserRouter>
  )
}
