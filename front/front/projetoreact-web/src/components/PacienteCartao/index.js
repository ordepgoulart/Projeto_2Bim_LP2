//importar o react que traz todos os recursos dele
import React, {useEffect, useMemo, useState} from 'react';
import * as Styl from './styles'
import iconePadrao from '../../assets/pessoa.png'
import {format} from 'date-fns'
import api from '../../services/api';

function ConsultaCartao({nome, vinculo, dataNasc,telefone, cpf, sexo}) {

  const diaMesAno = useMemo(()=> format(new Date(dataNasc), 'dd/MM/yyyy'))

  return (
    <Styl.Container >
      <Styl.TopoCartao>
        <img src={iconePadrao} alt="Icone Paciente"/>
        <h1>{nome}</h1>
      </Styl.TopoCartao>
      <Styl.BotaoCartao>
        <strong>Telefone: {telefone}</strong>
        <strong>CPF: {cpf}</strong>
        <strong>Sexo: {sexo}</strong>
        <strong>Vínculo: {vinculo == 1 ? "Plano de Saúde" : "Particular"}</strong>
        <strong>Data de nascimento: {diaMesAno}</strong>
      </Styl.BotaoCartao>
    </Styl.Container>
  );
}
export default ConsultaCartao;
