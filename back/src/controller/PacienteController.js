const PacienteModel = require('../model/PacienteModel')

//data e hora do momento
const hoje = new Date()

class PacienteController{
    //função para criar a consulta
    static async criar(req, resp){
        //recuperar infos do body da req.
        //dados obrigatórios
        const paciente = new PacienteModel(req.body)

        //salvar no banco
        await paciente
            .save()//salvar no mongo
            .then(resposta =>{
                return resp.status(200).json(resposta)
            })
            .catch(erro=>{
                return resp.status(500).json(erro)
            })
    }

    static async atualizar(req, resp){

        //resgatar os dados da consulta pelo id (findbyid)
        //passar pelo body da req as informações para a alteração
        //quando for feita a aatualização o mongo identifica se mudou 
        //algum atributo e atualiza a os campos alterados
        //propriedade new: true --> sempre retorna os dados da consulta
        //atualizados na resposta
        await PacienteModel.findByIdAndUpdate(
            {'_id': req.params.id},
            req.body,
            {new: true}
            )
            .then(resposta =>{
                return resp.status(200).json(resposta)
            })
            .catch(erro=>{
                return resp.status(500).json(erro)
            })
    }

    static async listar(req, resp){
        //listar consultas
        //por tipo
        //operador in para procurar entre os dados existentes quais 
        // consultas são do tipo passado por parametro
        await PacienteModel.find(
            {'tipo': {'$in':req.body.tipo}}
            )
            //organizar as consultas por data crescente
            .sort('data')
            .then(resposta =>{
                return resp.status(200).json(resposta)
            })
            .catch(erro=>{
                return resp.status(500).json(erro)
            })
    }

    static async buscar(req, resp){
        //passar por parametro o id da consulta que quero buscar
        await PacienteModel.findById(req.params.id)
            .then(resposta =>{
                return resp.status(200).json(resposta)
            })
            .catch(erro=>{
                return resp.status(500).json(erro)
            })
    }

    static async deletar(req, resp){
        //passar por parametro o id da consulta que quero buscar
        await PacienteModel.deleteOne({'_id':req.params.id})
            .then(resposta =>{
                return resp.status(200).json(resposta)
            })
            .catch(erro=>{
                return resp.status(500).json(erro)
            })
    }

    static async consultarPlanoSaude(req, resp){

        await PacienteModel.find(
            //operador lt --> less then --> menor que
            {'vinculo': 1}
            )
            .sort('cpf')
            .then(resposta =>{
                return resp.status(200).json(resposta)
            })
            .catch(erro=>{
                return resp.status(500).json(erro)
            })
    }

    static async consultarParticular(req, resp){

        await PacienteModel.find(
            {'vinculo': 2}
            )
            .sort('cpf')
            .then(resposta =>{
                return resp.status(200).json(resposta)
            })
            .catch(erro=>{
                return resp.status(500).json(erro)
            })
    }

    static async consultarMasculino(req, resp){

        await PacienteModel.find(
            {'sexo': 'Masculino'}
            )
            .sort('cpf')
            .then(resposta =>{
                return resp.status(200).json(resposta)
            })
            .catch(erro=>{
                return resp.status(500).json(erro)
            })
    }

    static async consultarFeminino(req, resp){

        await PacienteModel.find(
            {'sexo': 'Feminino'}
            )
            .sort('cpf')
            .then(resposta =>{
                return resp.status(200).json(resposta)
            })
            .catch(erro=>{
                return resp.status(500).json(erro)
            })
    }

    static async dataNasc(req, resp){

        await PacienteModel.find(
            //operador gte --> maior igual que
            //operador lte --> menor igual que
            {'data': {'$gte':req.body.pI, '$lte': req.body.pF}})
            .sort('data')
            .then(resposta =>{
                return resp.status(200).json(resposta)
            })
            .catch(erro=>{
                return resp.status(500).json(erro)
            })
    }

    static async cpf(req, resp){
        await PacienteModel.find({'cpf': req.params.cpf})
            .then(resposta =>{
                return resp.status(200).json(resposta)
            })
            .catch(erro=>{
                return resp.status(500).json(erro)
            })
    }

    static async consultarTodos(req, resp){
        await PacienteModel.find()
            .sort('cpf')
            .then(resposta =>{
                return resp.status(200).json(resposta)
            })
            .catch(erro=>{
                return resp.status(500).json(erro)
        })
    }
    
}
//expostar a minha classe
module.exports = PacienteController