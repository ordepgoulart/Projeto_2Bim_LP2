const express = require('express')
const rota = express.Router()
const PacienteController = require('../controller/PacienteController')
const PacienteValido = require('../middlewares/PacienteValido')

//toda vez que chegar uma req do tipo post em /consulta
//vou chamar o controller para receber o post
rota.post('/', PacienteValido, PacienteController.criar)

rota.put('/:id', PacienteValido, PacienteController.atualizar)

rota.get('/cpf/:cpf', PacienteController.cpf)

rota.put('/periodo', PacienteController.dataNasc)

rota.get('/listar', PacienteController.listar)

rota.get('/buscar/:id', PacienteController.buscar)

rota.delete('/deletar/:id', PacienteController.deletar)

rota.get('/planosaude', PacienteController.consultarPlanoSaude)

rota.get('/particular', PacienteController.consultarParticular)

rota.get('/masculino', PacienteController.consultarMasculino)

rota.get('/feminino', PacienteController.consultarFeminino)
module.exports = rota