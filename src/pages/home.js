import '../styles/home.css'
import mockup from '../assets/mockup.svg'
import Button from '../components/button'
import logo from '../assets/logotipo.svg'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="Home">
      <img id="logo" src={logo} alt="logo"></img>
      <div id="container">
        <div id="title">
          <h1 id='h1'>
            Manipule e acesse seus prontuários de forma simples, rápida e
            gratuita!
          </h1>

          <Link to="/cadastroMedico">
            <Button nameButton="Começar" />
          </Link>
        </div>
        <div id="imgMockup">
          <img src={mockup} id="mockup" alt="mockup"></img>
        </div>
      </div>
    </div>
  )
}

export default Home
