const ConsultaModel = require('../model/ConsultaModel')

//importar o date-fns
//função isPast para verificar se a data está no passado
const { isPast } = require('date-fns')
const ConsultaValida = async (req, resp, next) =>{

        const tipo = req.body.tipo
        const paciente = req.body.paciente
        const descricao = req.body.descricao
        const data = req.body.data

        if(!tipo)
            return resp.status(400).json({erro: 'O tipo é obrigatório'})
        else if(!paciente)
            return resp.status(400).json({erro: 'O paciente é obrigatório'})
        else if(!descricao)
            return resp.status(400).json({erro: 'A descricao é obrigatório'})
        else if(!data)
            return resp.status(400).json({erro: 'A data é obrigatório'})
        else if(isPast(new Date(data)))
            return resp.status(400).json({erro: 'Escolha uma data e hora futura'})
    
        else{
            let existe
            if(tipo == 3){
                if(req.params.id){
                    existe = await ConsultaModel
                    .findOne(
                        //operador de igualdade --> $eq
                        {'data':{'$eq': new Date(data)},
                        //operador não existe --> $ne 
                        '_id':{'$ne':req.params.id}, 'tipo': {"$eq":tipo}   
                    }
                    )
                }
                else
                {
                    existe = await ConsultaModel.findOne({'data': {$eq: new Date(data)}, 'tipo' : Number(tipo), 'paciente' : paciente})
                    if(existe)
                        return resp.status(400).json({erro: 'Já existe consulta nesse dia e horário para esse paciente'})
                    existe = await ConsultaModel.findOne({'data': {'$gte': new Date(data)}})
                    if(existe){
                        await ConsultaModel.updateMany({'data' : {'$gte' : new Date(data)}},[{"$set" : {'data' : {'$add' : ['$data', 3600000]}}}])
                        console.log("To aqui")
                    }
                    else {
                        console.log("To fora")
                    }
                }
            }
            else {
                //validar se na data atualizada ja existente uma consulta criada
                if(req.params.id){
                    existe = await ConsultaModel
                    .findOne(
                        //operador de igualdade --> $eq
                        {'data':{'$eq': new Date(data)},
                        //operador não existe --> $ne 
                        '_id':{'$ne':req.params.id}   
                    }
                    )

                }
                else{
                    //buscar na colection a consulta pelo mesma data e hora
                    //vou usar o campo data para verificar 
                    //operacor de igual utilizado para validação no banco é: $eq
                    existe = await ConsultaModel.findOne({'data': {$eq: new Date(data)}})
                }           
                if(existe)
                    return resp.status(400).json({erro: 'Já existe consulta nesse dia e horário'})
            }
            //criar variavel para iniciar como varia
            next()
        }
}
module.exports = ConsultaValida