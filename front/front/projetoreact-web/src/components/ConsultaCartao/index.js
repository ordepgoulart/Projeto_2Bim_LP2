//importar o react que traz todos os recursos dele
import React, {useMemo} from 'react';
import * as Styl from './styles'
//import iconePadrao from '../../assets/padrao.png'
import {format} from 'date-fns'
import tipoIcones from '../../utils/tipoIcones';

function ConsultaCartao({tipo, paciente, descricao, data}) {

  const diaMesAno = useMemo(()=> format(new Date(data), 'dd/MM/yyyy'))
  const horaMin = useMemo(()=> format(new Date(data), 'HH:mm'))

  return (
    <Styl.Container >
      <Styl.TopoCartao>
        <img src={tipoIcones[tipo]} alt="Icone consulta padrão"/>
        <h1>{paciente}</h1>
      </Styl.TopoCartao>
      <Styl.BotaoCartao>
        <strong>{diaMesAno}</strong>
        <span>{horaMin}</span>
      </Styl.BotaoCartao>
    </Styl.Container>
  );
}
export default ConsultaCartao;
