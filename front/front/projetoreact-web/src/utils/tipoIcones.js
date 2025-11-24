//criar uma coleção de icones com as imagens 
// dos tipos de consultas em um vetor

//importar os icones das imagens
import iconePadrao from '../assets/padrao.png'
import iconeRetorno from '../assets/retorno.png'
import iconeUrgencia from '../assets/urgente.png'
import iconeCirurgia from '../assets/cirurgia.png'
//vetor
// a primeira pos. será nula, pois o tipo de consulta
//inicia no tipo 1
const tipoIcones = [
    null,
    iconePadrao,
    iconeRetorno,
    iconeUrgencia,
    iconeCirurgia
]

export default tipoIcones