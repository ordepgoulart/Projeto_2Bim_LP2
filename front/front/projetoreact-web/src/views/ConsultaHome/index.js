//importar o react que traz todos os recursos dele
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import * as Styl from './styles'
import Footer from '../../components/Footer';
import FiltrarConsulta from '../../components/ConsultaFiltrar';
import ConsultaCartao from '../../components/ConsultaCartao';
import api from '../../services/api'
import { Link } from 'react-router-dom';
import tipoIcones from '../../utils/tipoIcones';

function Home() {
  
  
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

const [filtroConsulta, atualizarFiltroAtivo] = useState('hoje')
  

//o useState irá guardar uma coleção de informações [] --> dados do banco
const [consulta, atualizaConsulta] = useState([])
const [tipo, atualizarTipo] = useState()
const [parse, setParse] = useState()

async function carregarConsulta() {
  if(filtroConsulta != "nenhum"){
    if(filtroConsulta != "pesquisa"){
      atualizarTipo(0);
      await api.get(`/consulta/${filtroConsulta}`)
      .then(response=>{
        atualizaConsulta(response.data)
      })
    }
    else
    {
      if(parse !== undefined){
        await api.get(`/paciente/${filtroConsulta}/${parse}`)
        .then(async (response)=>{
          if(response.data.length > 0){
            const id = response.data[0]._id
            await api.get(`/consulta/buscarPACIENTE/${id}`)
            .then((response2)=>{
              atualizaConsulta(response2.data)
            })
          }
          else {
            alert("Não há nenhum CPF cadastrado com esse formato")
            atualizarFiltroAtivo("todas"); 
            setParse("");
          }
        })
        .catch(()=>{
          alert("Não há nenhum CPF cadastrado com esse formato")
          atualizarFiltroAtivo("todas"); 
          setParse("");
        })
      }
    }
  }
  else{
    setParse("");
    await api.get(`/consulta/tipo/${tipo}`)
    .then(response=>{
      atualizaConsulta(response.data)
    })
  }
}

function notificacao(){
  atualizarFiltroAtivo('atrasadas')
}

//useEffect -- > atualizar a página quando carregar o estado
useEffect(()=>{
  carregarConsulta()
  verificaAtrasadas()
}, [filtroConsulta, tipo])


return  (
    <Styl.Container>
      <Header atrasadas = {atrasadas} noticacaoClick={notificacao}/>
        <Styl.Pesquisa>
          <div class="box">
              <input type="text" class="input" value={parse} placeholder="CPF do paciente (000.000.000-00)" onChange={(e)=>{setParse(e.target.value)}}/>
              <button type="submit" class="button" onClick={()=>atualizarFiltroAtivo("pesquisa")}>Buscar</button>
          </div>
        </Styl.Pesquisa>
        <Styl.AreaFiltro>
          <button type='button' onClick={()=>{atualizarFiltroAtivo("todas"); setParse("");}}>
              <FiltrarConsulta titulo="Todas" ativo={filtroConsulta=="todas"}/>
          </button>
          <button type='button' onClick={()=>{atualizarFiltroAtivo("hoje"); setParse("");}}>
              <FiltrarConsulta titulo="Hoje" ativo={filtroConsulta=="hoje"}/>
          </button>
          <button type='button' onClick={()=>{atualizarFiltroAtivo("semana"); setParse("");}}>
              <FiltrarConsulta titulo="Semana" ativo={filtroConsulta=="semana"}/>
          </button>
          <button type='button' onClick={()=>{atualizarFiltroAtivo("mes"); setParse("");}}>
              <FiltrarConsulta titulo="Mês" ativo={filtroConsulta=="mes"}/>
          </button>
          <button type='button' onClick={()=>{atualizarFiltroAtivo("ano"); setParse("");}}>
              <FiltrarConsulta titulo="Ano" ativo={filtroConsulta=="ano"}/>
          </button>
          <Styl.TipoIcones>
            {   
                tipoIcones.map((icone, index)=>(
                        index>0&&
                        <button type='button' onClick={()=>{atualizarTipo(index); atualizarFiltroAtivo("nenhum");}}>
                            <img src={icone} alt='Tipo consulta'
                            className={tipo && tipo != index && 'inativa'}/>
                        </button>
                            
                ))
            }
          </Styl.TipoIcones>
        </Styl.AreaFiltro>

        <Styl.Titulo>
          <h3>Consultas</h3>
        </Styl.Titulo>
        <Styl.Cartao>
          {
            consulta.map(c=>(
              <Link to={`/formulario/${c._id}`}>
                <ConsultaCartao
                tipo={c.tipo}
                paciente={c.paciente}
                descricao={c.descricao}
                data={c.data}
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
export default Home;
