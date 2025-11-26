//importar o react que traz todos os recursos dele
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/HeaderPaciente';
import * as Styl from './styles'
import Footer from '../../components/Footer';
import FiltrarPaciente from '../../components/PacienteFiltrar';
import PacienteCartao from '../../components/PacienteCartao';
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

const [filtroPaciente, atualizarFiltroAtivo] = useState('planosaude')
  

//o useState irá guardar uma coleção de informações [] --> dados do banco
const [paciente, atualizaPaciente] = useState([])

async function carregarPaciente() {
  await api.get(`/paciente/${filtroPaciente}`)
  .then(response=>{
    atualizaPaciente(response.data)
    console.log(response.data)
  })
}

function notificacao(){
  atualizarFiltroAtivo('atrasadas')
}

//useEffect -- > atualizar a página quando carregar o estado
useEffect(()=>{
  carregarPaciente()
  verificaAtrasadas()
}, [filtroPaciente])


  return  (
    <Styl.Container>
      <Header atrasadas = {atrasadas}/>
        <Styl.AreaFiltro>
          <button type='button' onClick={()=>atualizarFiltroAtivo("todos")}>
              <FiltrarPaciente titulo="Todos" ativo={filtroPaciente=="todos"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("planosaude")}>
              <FiltrarPaciente titulo="Plano de Saúde" ativo={filtroPaciente=="planosaude"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("particular")}>
              <FiltrarPaciente titulo="Particular" ativo={filtroPaciente=="particular"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("masculino")}>
              <FiltrarPaciente titulo="Masculino" ativo={filtroPaciente=="masculino"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("feminino")}>
              <FiltrarPaciente titulo="Feminino" ativo={filtroPaciente=="feminino"}/>
          </button>
        </Styl.AreaFiltro>

        <Styl.Titulo>
          <h3>Pacientes</h3>
        </Styl.Titulo>
        <Styl.Cartao>
          {
            paciente.map(c=>(
              <Link to={`/pacienteForm/${c._id}`}>
                <PacienteCartao
                nome={c.nome}
                vinculo={c.vinculo}
                dataNasc={c.dataNasc}
                telefone={c.telefone}
                cpf={c.cpf}
                sexo={c.sexo}
                />
              </Link>
            ))
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
