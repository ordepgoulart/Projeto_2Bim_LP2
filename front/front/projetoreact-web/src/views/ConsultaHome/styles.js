import styled from 'styled-components'

//exportar uma constante container que vai receber 
//o styled como uma div

export const Container = styled.div `
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 100%;
`

export const AreaFiltro = styled.div `
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
    margin-top: 30px;

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