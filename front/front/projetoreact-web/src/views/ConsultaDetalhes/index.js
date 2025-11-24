import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import * as Styl from './styles'
import Footer from '../../components/Footer';
import api from '../../services/api'
import tipoIcones from '../../utils/tipoIcones'
import { useParams } from 'react-router-dom';

function ConsultaDetalhes() {
    const [atrasadas, atualizaAtrasadas] = useState()
    const [tipo , atualizarTipo] = useState()

    //Criar estados para armazenar os dados da consulta que vem do banco
    const [id, setId] = useState()
    const [concluida, setConcluida] = useState(false)
    const [paciente, setPaciente] = useState()
    const [descricao, setDescricao] = useState()
    const [dia, setDay] = useState()
    const [hora, setHour] = useState()

    const {idC} = useParams()
    async function carregarConsulta() {
        await api.get(`/consulta/buscar/${idC}`)
        .then(resp=>{
            atualizarTipo(resp.data.tipo)
            setPaciente(resp.data.paciente)
            setDescricao(resp.data.descricao)
            setDay(format(new Date(resp.data.data), 'yyyy-MM-dd'))
            setHour(format(new Date(resp.data.data), 'HH:mm'))
        })
    }

    async function verificaAtrasadas() {
    await api.get('/consulta/atrasadas')
    .then(resp=>
        atualizaAtrasadas(resp.data.length)
    )
    }

    useEffect(()=>{
        carregarConsulta();
        verificaAtrasadas()
    }, [])

    async function salvar() {
        await api.post('/consulta',{
            tipo,
            paciente,
            descricao,
            data: `${dia}T${hora}:00.000`
        })
        .then(()=>{
            alet("Consulta cadastrada!")
        })
    }

    return  (
        <Styl.Container>
            <Header atrasadas = {atrasadas} />
                <Styl.Formulario>
                    <Styl.TipoIcones>
                        {   
                            tipoIcones.map((icone, index)=>(
                                   index>0&&
                                    <button type='button' onClick={()=>atualizarTipo(index)}>
                                        <img src={icone} alt='Tipo consulta'
                                        className={tipo && tipo != index && 'inativa'}/>
                                    </button>
                                        
                            ))
                        }
                    </Styl.TipoIcones>

                    <Styl.Input>
                        <span>Paciente</span>    
                        <input type='text' placeholder='Nome do paciente' onChange={e=>setPaciente(e.target.value)} value={paciente}/>
                    </Styl.Input>
                    
                    <Styl.TextArea>
                        <span>Descrição</span>    
                        <textarea rows={5} placeholder='Descrição da queixa' onChange={e=>setDescricao(e.target.value)} value={descricao}/>
                    </Styl.TextArea>

                    <Styl.Input>
                        <span>Data</span>    
                        <input type='date' onChange={e=>setDay(e.target.value)} value={dia}/>
                    </Styl.Input>

                    <Styl.Input>
                        <span>Hora</span>    
                        <input type='time' onChange={e=>setHour(e.target.value)} value={hora}/>
                    </Styl.Input>

                    <Styl.Opcao>
                        <div>
                            <input type='checkbox' onChange={e=>setConcluida(e.target.value)} value={!concluida}/>
                            <span>CONCLUÍDA</span>
                        </div>
                        <button type='button'>EXCLUIR</button>
                    </Styl.Opcao>

                    <Styl.Salvar>
                        <button type='button' onClick={salvar()}>SALVAR</button>
                    </Styl.Salvar>

                </Styl.Formulario>
            <Footer/>
        </Styl.Container>
    )
}

export default ConsultaDetalhes;
