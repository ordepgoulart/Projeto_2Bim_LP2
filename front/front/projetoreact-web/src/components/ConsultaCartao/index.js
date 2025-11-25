//importar o react que traz todos os recursos dele
import React, {useEffect, useMemo, useState} from 'react';
import * as Styl from './styles'
//import iconePadrao from '../../assets/padrao.png'
import {format} from 'date-fns'
import tipoIcones from '../../utils/tipoIcones';
import api from '../../services/api';

function ConsultaCartao({tipo, paciente, descricao, data}) {

  const diaMesAno = useMemo(()=> format(new Date(data), 'dd/MM/yyyy'))
  const horaMin = useMemo(()=> format(new Date(data), 'HH:mm'))
  const [pacienteNome, setPacienteNome] = useState();

  async function carregarNome() {
    await api.get(`/paciente/cpf/${paciente}`)
    .then(resp=> {
      if(resp.data.length > 0)  
        setPacienteNome(resp.data[0].nome)
      console.log(resp.data)
    });
  }

  useEffect(()=>{
    carregarNome();
  }, []);

  return (
    <Styl.Container >
      <Styl.TopoCartao>
        <img src={tipoIcones[tipo]} alt="Icone consulta"/>
        <h1>{pacienteNome != undefined ? pacienteNome : paciente}</h1>
        {console.log(tipoIcones[tipo])}
      </Styl.TopoCartao>
      <Styl.BotaoCartao>
        <strong>{diaMesAno}</strong>
        <span>{horaMin}</span>
      </Styl.BotaoCartao>
    </Styl.Container>
  );
}
export default ConsultaCartao;
