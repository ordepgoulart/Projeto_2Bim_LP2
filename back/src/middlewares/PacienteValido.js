const PacienteModel = require('../model/PacienteModel')    

//importar o date-fns
//função isPast para verificar se a data está no passado
const { isAfter } = require('date-fns')
const PacienteValido = async (req, resp, next) =>{

        const nome = req.body.nome
        const vinculo = req.body.vinculo
        const prontuario = req.body.prontuario
        const dataNasc = req.body.dataNasc
        const cpf = req.body.cpf
        const telefone = req.body.telefone
        const cep = req.body.cep
        const endereco = req.body.endereco
        const cidade = req.body.cidade
        const estado = req.body.estado

        if(!nome)
            return resp.status(400).json({erro: 'O nome é obrigatório'})
        else if(!vinculo)
            return resp.status(400).json({erro: 'O vínculo é obrigatório'})
        else if(!prontuario)
            return resp.status(400).json({erro: 'O prontuário é obrigatório'})
        else if(!dataNasc)
            return resp.status(400).json({erro: 'A data de nascimento é obrigatório'})
        else if(isAfter(new Date(dataNasc)))
            return resp.status(400).json({erro: 'Escolha uma data de nascimento válida'})
        else if(!cpf)
            return resp.status(400).json({erro: 'O CPF é obrigatório'})
        else if(!telefone)
            return resp.status(400).json({erro: 'O telefone é obrigatório'})
        else if(!cep)
            return resp.status(400).json({erro: 'O CEP é obrigatório'})
        else{
            //criar variavel para iniciar como varia
            let existe
            
            //validar se na data atualizada ja existente uma consulta criada
            if(req.params.id){
                existe = await PacienteModel
                            .findOne(
                                //operador de igualdade --> $eq
                                {'cpf':{'$eq': cpf},
                                //operador não existe --> $ne 
                                '_id':{'$ne':req.params.id}   
                            }
                            )

            }else{
                    existe = await PacienteModel.findOne({'telefone': {$eq: telefone}})
            }           
            if(existe)
                return resp.status(400).json({erro: 'Já existe consulta nesse dia e horário'})


            next()
        }
}
module.exports = PacienteValido