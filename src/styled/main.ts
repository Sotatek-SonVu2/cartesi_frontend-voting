import styled from "styled-components";
import { colorTheme } from "./common";

export const MainWrapper = styled.div`
    background: ${colorTheme.background};
    min-height: 100vh;
    overflow: hidden;
`

export const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: 42rem;
    padding-bottom: 3rem;

    @media(max-width: 742px){
        margin: 10px;
    }
`

export const FlexLayout = styled.div`
    display: flex;
    align-items: center;
`

export const FlexLayoutSwap = styled(FlexLayout)`
    flex-wrap: wrap;
`

export const FlexItem = styled.div`
    width: 250px;
`

export const ContentWrapper = styled.div`  
    background: ${colorTheme.tranparent};
    display: block;
    flex-shrink: 0;
    margin: 0 auto;
    min-height: 0;
    border-radius: 8px;
    transition: .2s;
    overflow: hidden;
`

export const Title = styled.h3`
    font-size: 35px;
    color: #fff;
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 10px;
`

export const SubTitle = styled.p`
    font-size: 20px;
    color: #fff;
    text-align: center;
    margin-bottom: 3rem;
`

export const Setting = styled.img`
    position: fixed;
    left: 20px;
    bottom: 20px;
    cursor: pointer;
`