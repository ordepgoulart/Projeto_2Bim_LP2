//importar o react que traz todos os recursos dele
import React from 'react';
import * as Styl from './styles'
import logo from '../../assets/logo.png'
import sino from '../../assets/sino.png'
import { Link } from 'react-router-dom';

function Header({atrasadas, noticacaoClick}) {
  return (
    <Styl.Container>
        <Styl.Esq>
            <img src={logo} alt="Logo"/>
        </Styl.Esq>
        <Styl.Dir>
        <Link to="/">Início</Link>
        <span className="divisor"/>
        <Link to="/pacientes">Pacientes</Link>
        <span className="divisor"/>
        <Link to="/formulario">Nova Consulta</Link>
        <span className="divisor"/>
          <button onClick={noticacaoClick} id="notificacao">
              <img src={sino} alt="Notificação"/>
              <span>{atrasadas}</span>
          </button>

        </Styl.Dir>
    </Styl.Container>
  );
}
//exportar a função para quando o arquivo for 
// convocado em algum lugar
//eu export tudo que foi definido na função
export default Header;
