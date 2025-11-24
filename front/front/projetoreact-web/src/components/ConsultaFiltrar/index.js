//importar o react que traz todos os recursos dele
import React from 'react';
import * as Styl from './styles'
import filtro from '../../assets/filtro.png'

function FiltrarConsulta({titulo, ativo}) {
  return (
    <Styl.Container ativo={ativo.toString()}>
        <img src={filtro} alt="Filtro"/>
        <span>{titulo}</span>
    </Styl.Container>
  );
}
export default FiltrarConsulta;
