import styled from "styled-components";

export const MenuList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const MenuTitle = styled.div`
    border-left: 1px solid #fff;
    padding: 0px 10px;
    cursor: pointer;

    &:last-child {
        border-right: 1px solid #fff;
    }
`

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 70px;
    align-items: center;
    padding: 0px 20px;

    & img {
        cursor: pointer;
    }
`

export const Menu = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    text-align: right;
    font-size: 13px;
    font-family: Euclid, Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.5rem;

    & .Icon {
        margin-left: 8px;
        padding-right: 8px;
        border-right: 1px solid #fff;
        
        &:last-child {
            border-right: 0px;
            padding-right: 0px;
        }
    }
    
`

export const InforUser = styled.div`
    margin-right: 20px
`

export const Address = styled.div`
    cursor: pointer;

    & span:hover {
        text-decoration: underline;
    }
`

export const Currency = styled.div`
    display: flex;
    align-items: center;

    & span {
        margin-left: 5px;
    }
`

export const NotifyHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    align-items: center;
    border-bottom: 1px solid #eee;

    & .title {
        font-weight: 600;
    }

    & .readAll:hover {
        text-decoration: underline;
    }
`

export const NotifyList = styled.div`
    visibility: hidden;
    min-width: 275px;
    background-color: #fff;
    color: #000;
    border-radius: 3px;
    position: absolute;
    z-index: 1;
    top: 113%;
    right: -16%;
    margin-left: -58px;
    box-shadow: #bfbfbf 0px 2px 8px 0px;
    cursor: pointer;
    transition: display .6s;
    
    &::after {
        content: "";
        position: absolute;
        top: -3%;
        left: 91%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #f3f4f6 transparent;
    }
`

export const NotifyItem = styled.div`
    padding: 5px 10px;
    border-bottom: 1px solid #eee;
    transition: background .6s;

    &:last-child {
        border-bottom: 0;
    }
    &:hover {
        background: #eee;
    }

    & img {
        margin-right: 10px;
    }

    & span {
        font-size: 11px;
        text-align: right;
    }
`

export const NotifyContent = styled.div`
text-align: left;
    display: flex;
    align-items: center;
`

export const NotifySection = styled.div`
    position: relative;
    display: flex;
    
    &:hover ${NotifyList} {
        visibility: visible;
    }
`