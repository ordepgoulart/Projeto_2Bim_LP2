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

    const {idP} = useParams()
    async function carregarPaciente() {
        if(idP != undefined){
            await api.get(`/paciente/buscar/${idP}`)
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
        if(idP != undefined)
            carregarPaciente();
        else{
            setVinculo(1);
            setSexo("Masculino")
        }
        verificaAtrasadas()
        
        
    }, [])

    async function salvar() {
        await api.post('/paciente',{
            nome,
            vinculo,
            prontuario,
            dataNasc: dataNasc!=undefined ? `${dataNasc}T00:00:00.000` : null,
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
            window.location.href='/pacientes'
        })
        .catch(e=>{window.alert(e.response.data.erro)})
    }

    async function atualizar() {
         await api.put(`/paciente/${idP}`,{
            nome,
            vinculo,
            prontuario,
            dataNasc: dataNasc != undefined ? `${dataNasc}T00:00:00.000` : null,
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
            window.location.href = '/pacientes'
        })
        .catch((e)=>{
            alert(e.response.data.erro)
        })
       
    }

    async function excluir() {
        let confirmar = window.confirm("Deseja realmente excluir o paciente?");
        if(confirmar){
            await api.delete(`/consulta/deletarPorPaciente/${idP}`)
            .then(async()=>{
                await api.delete(`/paciente/deletar/${idP}`)
                .then(()=>{
                    alert("Paciente excluído com sucesso!")
                    window.location.href = '/pacientes'
                })
                .catch(()=>{
                    alert("Erro ao excluir o paciente!")
                })
            })
            .catch((e)=>{
                alert(e.response.data.erro)
            })
            
        }
       
    }

    return  (
        <Styl.Container>
            <Header atrasadas = {atrasadas} />
                <Styl.Formulario>
                    <Styl.Input>
                        <span>CPF do Paciente</span>    
                        <input type='text' placeholder='CPF do paciente' onChange={e=>setCpf(e.target.value)} value={cpf}/>
                    </Styl.Input>
                    
                    <Styl.Input>
                        <span>Nome do Paciente</span>    
                        <input type='text' placeholder='Nome do paciente' onChange={e=>setNome(e.target.value)} value={nome}/>
                    </Styl.Input>

                    <Styl.TextArea>
                        <span>Prontuário</span>    
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

                    <Styl.Input>
                        <span>Endereço</span>    
                        <input type='text' placeholder='Endereço do Paciente' onChange={e=>setEndereco(e.target.value)} value={endereco}/>
                    </Styl.Input>

                    <Styl.Input>
                        <div className='InputsAndSelect'>
                            <div className='spanInLine'>
                                <span>Cidade</span> 
                                <span className='toLeft'>UF</span> 
                            </div>
                            <div className='InputSelect'>
                                <input type='text' placeholder='Cidade do paciente' onChange={e=>setCidade(e.target.value)} value={cidade}/>
                                <select className='EstadoSelect' value={estado} onChange={e=>{setEstado(e.target.value)}}>
                                    <option value="" disabled>Selecione um estado</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                            </div>
                        </div>
                    </Styl.Input>    
                    <Styl.Input>
                        <div className='InputsAndSelect'>
                            <div className='spanInLine'>
                                <span>Definir Vínculo</span> 
                                <span className='toMoreLeft'>Sexo</span> 
                            </div>
                            <div className='InputSelect'>
                                <select className='forSelectVinculo' value={vinculo} onChange={e=>{setVinculo(e.target.value)}}>
                                    <option value="1">Plano de Saúde</option>
                                    <option value="2">Particular</option>
                                </select>
                                <select className='forSelectSexo' value={sexo} onChange={e=>{setSexo(e.target.value)}}>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                            </div>
                        </div>
                       
                        
                    </Styl.Input>      
                    <Styl.Opcao>
                        {
                            idP == undefined ? null :
                            <button type='button' onClick={() => excluir()}>Excluir</button>
                        }
                    </Styl.Opcao>
                    <Styl.Salvar>   
                        { idP == undefined ?
                            <button type='button' onClick={() => salvar()}>Salvar</button> 
                            :
                            <button type='button' onClick={() => atualizar()}>Atualizar</button>
                        }
                    </Styl.Salvar>

                </Styl.Formulario>
            <Footer/>
        </Styl.Container>
    )
}

export default PacienteDetalhes;
