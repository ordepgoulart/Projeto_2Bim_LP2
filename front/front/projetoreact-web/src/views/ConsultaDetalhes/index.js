import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import * as Styl from './styles'
import Footer from '../../components/Footer';
import api from '../../services/api'
import tipoIcones from '../../utils/tipoIcones'
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

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
        if(!idC){
            await api.get(`/consulta/buscar/${idC}`)
            .then(resp=>{
                atualizarTipo(resp.data.tipo)
                setPaciente(resp.data.paciente)
                setDescricao(resp.data.descricao)
                setDay(format(new Date(resp.data.data), 'yyyy-MM-dd'))
                setHour(format(new Date(resp.data.data), 'HH:mm'))
            })
            await api.get(`/paciente/${paciente}`)
            .then(resp=>{
                setPaciente(resp.data.cpf)
            })
        }
    }        

    async function verificaAtrasadas() {
        await api.get('/consulta/atrasadas')
        .then(resp=>
            atualizaAtrasadas(resp.data.length)
        )
    }

    useEffect(()=>{
        
        if(idC != undefined)
            carregarConsulta();
        verificaAtrasadas()
    }, [])

    async function salvar() {
        await api.get(`/paciente/cpf/${paciente}`)
        .then(async resp=>{
            if(resp.data.length===0){
                setPaciente(resp.data[0]._id)
                await api.post('/consulta',{
                    tipo,
                    paciente,
                    descricao,
                    data: `${dia}T${hora}:00.000`,
                    concluida
                })
                .then(()=>{
                    alert("Consulta cadastrada!")
                })
                .catch(()=>{
                    alert("Erro ao cadastrar a consulta!")
                })
            } else {
                alert("Paciente não cadastrado!")
            }
        })
        .catch(()=>{
            alert("Erro ao recuperar o paciente!")
        })
    }

    async function atualizar() {
        await api.get(`/paciente/cpf/${paciente}`)
        .then(async resp=>{
            if(resp.data.length===0){
                setPaciente(resp.data[0]._id)
                 await api.put(`/consulta/${idC}`,{
                    tipo,
                    paciente,
                    descricao,
                    data: `${dia}T${hora}:00.000`,
                    concluida
                })
                .then(()=>{
                    alert("Consulta atualizada!")
                })
            } else {
                alert("Paciente não cadastrado!")
            }
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
                        <span>CPF doPaciente</span>    
                        <input type='text' placeholder='CPF do paciente' onChange={e=>setPaciente(e.target.value)} value={paciente}/>
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
                            <span>Concluída</span>
                        </div>
                        {
                            idC == undefined ? null :
                            <button type='button'>Excluir</button>
                        }
                        
                    </Styl.Opcao>

                    <Styl.Salvar>   
                        { idC == undefined ?
                            <button type='button' onClick={() => salvar()}>Salvar</button> 
                            ://Mandei no grupo o disc
                            <button type='button' onClick={() => atualizar()}>Atualizar</button>
                        }
                    </Styl.Salvar>

                </Styl.Formulario>
            <Footer/>
        </Styl.Container>
    )
}

export default ConsultaDetalhes;
