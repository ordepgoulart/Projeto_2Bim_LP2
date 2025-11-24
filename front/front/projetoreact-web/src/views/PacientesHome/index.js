//importar o react que traz todos os recursos dele
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/HeaderPaciente';
import * as Styl from './styles'
import Footer from '../../components/Footer';
import FiltrarConsulta from '../../components/ConsultaFiltrar';
import ConsultaCartao from '../../components/ConsultaCartao';
import api from '../../services/api'
import { Link } from 'react-router-dom';

function PacientesHome() {
  
  
const [atrasadas, atualizaAtrasadas] = useState()
async function verificaAtrasadas() {
  await api.get('/consulta/atrasadas')
  .then(resp=>
    atualizaAtrasadas(resp.data.length)
  )
}




//constante (vetor) que irá armazenar o estado da prop ativo
//vetor - 2 parâmetros
//1º nome do estado
//2º função que atualiza o estado
//vamos utilizar o useState para que todas as vezes que o usuário cliar 
//na caixa de filtro, a função (atualizarFiltroAtivo) irá armazenar 
//o estado atual do filtro

const [filtroConsulta, atualizarFiltroAtivo] = useState('planosaude')
  

//o useState irá guardar uma coleção de informações [] --> dados do banco
const [consulta, atualizaConsulta] = useState([])

async function carregarConsulta() {
  await api.get(`/paciente/${filtroConsulta}`)
  .then(response=>{
    atualizaConsulta(response.data)
    console.log(response.data)
  })
}

function notificacao(){
  atualizarFiltroAtivo('atrasadas')
}

//useEffect -- > atualizar a página quando carregar o estado
useEffect(()=>{
  carregarConsulta()
  verificaAtrasadas()
}, [filtroConsulta])


  return  (
    <Styl.Container>
      <Header atrasadas = {atrasadas}/>
        <Styl.AreaFiltro>
          <button type='button' onClick={()=>atualizarFiltroAtivo("planosaude")}>
              <FiltrarConsulta titulo="Plano de Saúde" ativo={filtroConsulta=="planosaude"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("particular")}>
              <FiltrarConsulta titulo="Particular" ativo={filtroConsulta=="particular"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("masculino")}>
              <FiltrarConsulta titulo="Masculino" ativo={filtroConsulta=="masculino"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("feminino")}>
              <FiltrarConsulta titulo="Feminino" ativo={filtroConsulta=="feminino"}/>
          </button>
        </Styl.AreaFiltro>

        <Styl.Titulo>
          <h3>Consultas</h3>
        </Styl.Titulo>
        <Styl.Cartao>
          {
            consulta.map(c=>{
              <Link to={`/formulario/${c._id}`}>
                <ConsultaCartao
                tipo={c.tipo}
                paciente={c.paciente}
                descricao={c.descricao}
                data={c.data}
                />
              </Link>
            })
          }
        </Styl.Cartao>


      <Footer/>
    </Styl.Container>
)
}
//exportar a função para quando o arquivo for 
// convocado em algum lugar
//eu export tudo que foi definido na função
export default PacientesHome;
