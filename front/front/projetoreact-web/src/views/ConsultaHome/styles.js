import styled from 'styled-components'

//exportar uma constante container que vai receber 
//o styled como uma div

export const Container = styled.div `
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 100%;
`

export const TipoIcones = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
    .inativa{
        opacity: 0.5;
    }

    button{
        background: none;
        border: none;
    }

    img{
        width: 80px;
        height: 80px;
        margin: 10px;
        cursor: pointer;

        &:hover{
        opacity: 0.5;
        }
    }
`

export const AreaFiltro = styled.div `
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
    margin-top: 30px;
    margin-bottom: -2rem;
    button{
    
        background: none;
        border: none;
    }
`

export const Cartao = styled.div `
    width: 100%;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    a{
        color: #000;
        text-decoration: none;
    }
    span{
        font-weight:bold;
    }
`
export const Titulo = styled.div `

    width: 100%;
    border-bottom: 1px solid #22B14C;
    display:flex;
    justify-content:center;
    margin-left:auto;    
    margin-right:auto; 
    margin-top:15px;   
    margin-bottom:30px;   

    h3{
        color: #22B14C;
        position:relative;
        top: 30px;
        background: #FFF;
        padding: 0 20px;
    }

`

export const Pesquisa = styled.div `
    .box {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    .input {
        text-align: center;
        padding: 10px 15px;
        font-size: 16px;
        border: 2px solid #ddd;
        border-radius:25px 0 0 25px; 
        outline: none;
        width: 80%;
        transition: background-color 0.3s;
    }

    .input:focus {
    border-color: #22B14C; 
    }

    .button {
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    background-color: #22B14C;
    color: white;
    border-radius: 0 25px 25px 0; 
    cursor: pointer;
    transition: background-color 0.3s; 
    }

    .button:hover {
    background-color: rgba(24, 119, 53, 1);
    }
`
