import styled from 'styled-components'

export const Container = styled.div`
    width: 300px;
    height: 90px;
    background: ${prop=> prop.ativo=="true"  ? '#22B24C' : '#C0C0C0'}; 
    display: flex;
    border-radius: 5px;
    padding: 10px;

    flex-direction: column;
    justify-content: space-around;
    cursor:pointer;


    &:hover{
        background: #22B24C;
        }

    img{
        width: 25px;
        height: 25px;
    }

    span{
        color: #fff;
        font-weight: bold;
        align-self: flex-end;
        font-size: 18px;

    }

    

`