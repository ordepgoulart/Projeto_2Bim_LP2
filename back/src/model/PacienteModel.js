//mongoose
const mongoose = require('../config/db')

//shema
//representação de informações para armazenar os dados no banco
const Schema = mongoose.Schema

//criar o arquivo de configuração
const PacienteSchema = new Schema({

    nome: {type: String, required: true},
    vinculo: {type: Number, required: true},
    prontuario: {type: String, required: true},
    //2025-10-24T12:21:28.083Z
    dataNasc: {type: Date, required: true},
    cpf: {type: String , required: true},
    telefone: {type: String, required: true},
    cep: {type: String, required: true},
    endereco: {type: String, required: false},
    cidade: {type: String, required: false},
    estado: {type: String, required: false},
    sexo: {type: String, required: true},
    criada: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Paciente', PacienteSchema)