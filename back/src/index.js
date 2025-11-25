const express = require('express')
const api = express()
const cors = require('cors')
const ConsultaRoutes = require('./routes/ConsultaRoutes')
const PacienteRoutes = require('./routes/PacienteRoutes')
api.use(cors())
//api saber que estamos recebendo info e devolvendo info em json
api.use(express.json())

//importar a rota consulta
api.use('/consulta', ConsultaRoutes)
api.use('/paciente', PacienteRoutes)

api.listen(5000, ()=>{
    console.log('API online')
})

