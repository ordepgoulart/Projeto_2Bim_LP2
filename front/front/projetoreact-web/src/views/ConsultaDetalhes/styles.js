import styled from 'styled-components'


export const Container = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
   
`
export const Formulario = styled.div `
    width: 50%;
    margin-bottom: 70px;
`
export const TipoIcones = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;

    .inativa{
        opacity: 0.5;
    }

    button{
        background: none;
        border: none;
    }

    img{
        width: 50px;
        height: 50px;
        margin: 10px;
        cursor: pointer;

        &:hover{
        opacity: 0.5;
        }
    }
`

export const Input = styled.div `
    width: 100%;
    display:flex;
    flex-direction: column;
    margin: 20px 0;
    span{
        color: #707070;
        margin-bottom: 5px;    
    }
    input{
        font-size: 16px;
        padding: 15px;
        border: none;
        border-bottom: 1px solid #22B14C;
    }
`
export const TextArea = styled.div `
    width: 100%;
    display:flex;
    flex-direction: column;
    margin: 20px 0;
    span{
        color: #707070;
        margin-bottom: 5px;    
    }
    textarea{
        font-size: 16px;
        border-bottom: 1px solid #22B14C;
    }
`

export const Opcao = styled.div `
    display: flex;
    justify-content: space-between;
    button{
        font-weight: bold;
        color: #22B14C;
        border: none;
        background: none;
        font-size: 18px;
        cursor: pointer;
        &:hover{
            opacity: 0.7;
        }
    }

    div{
        display: flex;
        color: #22B14C;
        align-items: center;
        font-weight: bold;
        font-size: 18px;
    }
`

export const Salvar = styled.div `
    width: 100%;
    margin-top: 20px;
    button{
        width: 100%;
        background: #22B14C;
        font-weight: bold;
        font-size: 20px;
        color: #FFF;
        padding:20px;
        border-radius:30px;
        cursor: pointer;
        &:hover{
            opacity: 0.7;
        }
    }
`