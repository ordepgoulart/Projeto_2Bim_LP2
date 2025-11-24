//vamos guardar as informações de conexão com o backend
import axios from 'axios'

//criar uma constante chamada api
//dentro do axios tem uma função "create"
// essa função irá criar uma conexao com a api 
//ela tem por padrão de configuração o param baseURL
//na baseURL iremos passar o endereço da conexao com o back
//http://localhost:5000
const api = axios.create({
    baseURL: 'http://localhost:5000'
})

export default api