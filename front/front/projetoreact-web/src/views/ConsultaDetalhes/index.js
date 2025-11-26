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
    const [retorno, setRetorno] = useState()
    const [dia, setDay] = useState()
    const [hora, setHour] = useState()
    const [tipoVindo, setTipoVindo] = useState()
    const [status,setStatus] = useState()
    const {idC} = useParams()

    async function carregarConsulta() {
        if(idC != undefined){
            await api.get(`/consulta/buscar/${idC}`)
            .then(async resp=>{
                atualizarTipo(resp.data.tipo)
                setTipoVindo(resp.data.tipo)
                setDescricao(resp.data.descricao)
                setDay(format(new Date(resp.data.data), 'yyyy-MM-dd'))
                setHour(format(new Date(resp.data.data), 'HH:mm'))
                setConcluida(resp.data.termino)
                setStatus(resp.data.termino)
                setRetorno(resp.data.retorno)
                const re = resp.data.paciente
                if(re != undefined){
                    await api.get(`/paciente/buscar/${re}`)
                    .then(resp=>{
                        const pe = resp.data.cpf
                        setPaciente(pe)
                    })
                }              
                
            })
            
            
        }
            
    }        

    async function verificaAtrasadas() {
        await api.get('/consulta/atrasadas')
        .then(resp=>
            atualizaAtrasadas(resp.data.length)
        )
    }

    async function verificarCirugia() {
        let re;
        await api.get('/consulta/verificaCirugia')
        .then(resp=>{
            if(resp.data.length>0){
                re = resp.data[0]._id             
            }
            else re = null;
        })
        return re;
    }

    async function initialize() {
        const cirurgia = await verificarCirugia();
        if(cirurgia != null){
            if(idC != undefined && idC == cirurgia){
                carregarConsulta();
                verificaAtrasadas()
            }
            else{
                alert("Uma cirugia está em andamento!")
                window.location.href = '/'
            }   
        }
        else {
            if(idC != undefined)
                carregarConsulta();
            verificaAtrasadas()
        }
    }

    useEffect(()=>{
        initialize()
    }, [])

    async function salvar() {
        await api.get(`/paciente/cpf/${paciente}`)
        .then(async resp=>{         
            if(resp.data.length!=0){
                const idPaciente = resp.data[0]._id
                let idRetorno = null;
                setPaciente(idPaciente)
                if(tipo == 2){
                    await api.get(`/consulta/marcarRetorno/${dia}T${hora}:00.000/${idPaciente}`)
                    .then(async resp2=>{
                        if(resp2.data.length>0){
                            idRetorno = resp2.data[0]._id
                            setRetorno(idRetorno);
                            await api.post('/consulta',{
                                tipo,
                                paciente: idPaciente,
                                descricao,
                                data: `${dia}T${hora}:00.000`,
                                termino : concluida,
                                retorno : idRetorno
                            })
                            .then(()=>{
                                alert("Consulta cadastrada!")
                                window.location.href = '/'
                            })
                            .catch((e)=>{
                                setPaciente(resp.data[0].cpf)
                                alert(e.response.data.erro)
                                
                            })
                        }
                        else{
                            setPaciente(resp.data[0].cpf)
                            alert("Não há consultas concluídas para se marcar um retorno!")
                        }
                    })
                    .catch(e=>{window.alert(e.response.data.erro)})
                }else {
                    setRetorno(null);
                    await api.post('/consulta',{
                        tipo,
                        paciente: idPaciente,
                        descricao,
                        data: `${dia}T${hora}:00.000`,
                        termino : concluida,
                        retorno : idRetorno
                    })
                    .then(()=>{
                        alert("Consulta cadastrada!")
                        window.location.href = '/'
                    })
                    .catch((e)=>{
                        window.alert(e.response.data.erro)
                        setPaciente(resp.data[0].cpf)
                    })
                }  
            } else {
                alert("Paciente não cadastrado!")
            }
        })
        .catch(()=>{
            alert("Erro ao recuperar o paciente!")
        })
    }

    async function excluir() {
        let confirmar = window.confirm("Deseja realmente excluir a consulta?");
        if(confirmar){
            if(tipo != 2){
                await api.get(`/consulta/possuiretorno/${idC}`)
                .then(async resp=>{
                    if(resp.data.length>0){
                        alert("Não é possível excluir uma consulta que possui retorno agendado!")
                    }
                    else {
                        await api.delete(`/consulta/deletar/${idC}`)
                        .then(async()=>{
                            alert("Consulta excluída com sucesso!")
                            window.location.href = '/'
                        })
                        .catch(()=>{
                            alert("Erro ao excluir a consulta!")
                        })
                    }
                })
            }
            else {
                await api.delete(`/consulta/deletar/${idC}`)
                .then(async()=>{
                    alert("Consulta excluída com sucesso!")
                    window.location.href = '/'
                })
                .catch(()=>{
                    alert("Erro ao excluir a consulta!")
                })
            }
            
                
            
        }
       
    }


    async function atualizar() {
        if(!status){
            let confirmar;
            if(concluida){
                confirmar = window.confirm("Deseja concluir esta consulta? (UMA VEZ CONCLUÍDA ELA NÃO PODERÁ SER ALTERADA E SOMENTE SERÁ ALTERADA A DESCRIÇÃO CASO TENHA SIDO MODIFICADA)")
                if(confirmar){
                    await api.put(`/consulta/concluida/${idC}/${concluida}`,{descricao})
                    .then(()=>{
                        alert("Consulta concluída!")
                        window.location.href = '/'
                    })
                }
            }
            else{
                if(tipoVindo == 2 && tipo !=2){
                    alert("Não é possível alterar o tipo de uma consulta de retorno para outro tipo!");
                }
                else{
                    await api.get(`/paciente/cpf/${paciente}`)
                    .then(async resp=>{
                        if(resp.data.length>0){
                            const idPaciente = resp.data[0]._id
                            let idRetorno = null;
                            if(tipo == 2){
                                await api.get(`/consulta/marcarRetorno/${dia}/${paciente}`)
                                .then(async resp=>{
                                    if(resp.data.length>0){
                                        idRetorno = resp.data[0]._id
                                    }
                                })
                            }
                            setRetorno(idRetorno);
                            await api.put(`/consulta/${idC}`,{
                                tipo,
                                paciente : idPaciente,
                                descricao,
                                data: `${dia}T${hora}:00.000`,
                                termino:`${concluida}`,
                                retorno : idRetorno
                            })
                            .then(()=>{
                                alert("Consulta atualizada!")
                                window.location.href = '/'
                            })
                            .catch((e)=>{
                                alert(e.response.data.erro)
                                setPaciente(resp.data[0].cpf)
                            })
                            
                        } else {
                            alert("Paciente não cadastrado!")
                        }
                    })
                }
            }
        
        }
        else{
            alert("Uma consulta finalizada não pode ser alterada!")
        }
        
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
                        <span>CPF do Paciente</span>    
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
                            <input type='checkbox' onChange={e=>setConcluida(e.target.checked)} checked={concluida}/>
                            <span>Concluída</span>
                        </div>
                        {
                            idC == undefined ? null :
                            <button type='button' onClick={() => excluir()}>Excluir</button>
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
