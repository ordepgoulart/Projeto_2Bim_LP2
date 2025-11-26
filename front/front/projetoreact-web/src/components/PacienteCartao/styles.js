import styled from 'styled-components'

export const Container = styled.div`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius:10px;
    flex-direction: column;
    margin: 20px;

    box-shadow: -3px 1px 13px -2px rgba(0,0,0,0.73);

    cursor: pointer;
    &:hover{
        opacity: 0.5;
    }

`

export const TopoCartao = styled.div`
    display:flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
    img{
        width:100px;
        height:100px;    
    }
    h1{
        font-size: 1.2rem;
        text-align: center;
    }
`

export const BotaoCartao = styled.div`
    width:100%;    
    display:flex;
    justify-content:space-around;
    align-items: center;
    flex-direction: column;
    strong{
        color: #22B14C; 
        font-weight:bold;
    }
    span{
        color: #000000ff;
        font-weight:bold;
    }

`