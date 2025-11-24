import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/HeaderPaciente';
import * as Styl from './styles'
import Footer from '../../components/Footer';
import api from '../../services/api'
import tipoIcones from '../../utils/tipoIcones'
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

function PacienteDetalhes() {
    const [atrasadas, atualizaAtrasadas] = useState()
    //Criar estados para armazenar os dados da consulta que vem do banco
    const [id, setId] = useState()
    const [nome, setNome] = useState()
    const [vinculo, setVinculo] = useState()
    const [prontuario, setProntuario] = useState()
    const [cpf, setCpf] = useState()
    const [cep, setCep] = useState()
    const [endereco, setEndereco] = useState()
    const [cidade, setCidade] = useState()
    const [estado, setEstado] = useState()
    const [sexo, setSexo] = useState()
    const [telefone, setTelefone] = useState()
    const [dataNasc, setDataNasc] = useState()

    const {idC} = useParams()
    async function carregarPaciente() {
        if(!idC){
            await api.get(`/paciente/buscar/${idC}`)
            .then(resp=>{
                setNome(resp.data.nome)
                setVinculo(resp.data.vinculo)
                setProntuario(resp.data.prontuario)
                setCpf(resp.data.cpf)
                setCep(resp.data.cep)
                setEndereco(resp.data.endereco)
                setCidade(resp.data.cidade)
                setEstado(resp.data.estado)
                setSexo(resp.data.sexo)
                setTelefone(resp.data.telefone)
                setDataNasc(format(new Date(resp.data.dataNasc), 'yyyy-MM-dd'))
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
            carregarPaciente();
        verificaAtrasadas()
    }, [])

    async function salvar() {
        await api.post('/paciente',{
            nome,
            vinculo,
            prontuario,
            dataNasc: `${dataNasc}T00:00:00.000`,
            telefone,
            cep,
            endereco,
            cidade,
            estado,
            sexo,
            cpf
        })
        .then(()=>{
            alert("Paciente cadastrado!")
        })
    }

    async function atualizar() {
         await api.put(`/paciente/${idC}`,{
            nome,
            vinculo,
            prontuario,
            dataNasc: `${dataNasc}T00:00:00.000`,
            telefone,
            cep,
            endereco,
            cidade,
            estado,
            sexo,
            cpf
        })
        .then(()=>{
            alert("Paciente atualizado!")
        })
        .catch(()=>{
            alert("Erro ao atualizar paciente!")
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
                                    <button type='button' onClick={()=>setVinculo(index)}>
                                        <img src={icone} alt='Tipo Vínculo'
                                        className={vinculo && vinculo != index && 'inativa'}/>
                                    </button>
                                        
                            ))
                        }
                    </Styl.TipoIcones>

                    <Styl.Input>
                        <span>CPF doPaciente</span>    
                        <input type='text' placeholder='CPF do paciente' onChange={e=>setCpf(e.target.value)} value={cpf}/>
                    </Styl.Input>
                    
                    <Styl.TextArea>
                        <span>prontuario</span>    
                        <textarea rows={5} placeholder='Prontuario do paciente' onChange={e=>setProntuario(e.target.value)} value={prontuario}/>
                    </Styl.TextArea>

                    <Styl.Input>
                        <span>Data de nascimento</span>    
                        <input type='date' onChange={e=>setDataNasc(e.target.value)} value={dataNasc}/>
                    </Styl.Input>

                    <Styl.Input>
                        <span>CEP do Paciente</span>    
                        <input type='text' placeholder='CEP do paciente' onChange={e=>setCep(e.target.value)} value={cep}/>
                    </Styl.Input>

                    <Styl.Input>
                        <span>Fone do Paciente</span>    
                        <input type='text' placeholder='Fone do paciente' onChange={e=>setTelefone(e.target.value)} value={telefone}/>
                    </Styl.Input>

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

export default PacienteDetalhes;
