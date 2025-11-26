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


// Pedro Sá Goulart RA: 102419485
// Luís Vinícius Alves Monfré RA : 102418900
// Rafael Tintino Linhares de Souza RA : 102418624
// MURILO OROSCO RAMOS RA : 102317135
