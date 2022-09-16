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

    & .line {
        padding: 0px 3px;
        border-right: 1px solid #817e7e;
        height: 14px
    }

    & .readAll {
        padding-left: 3px;
        &:hover {
            text-decoration: underline;
        }
    }
`

export const NotifyList = styled.div`
    visibility: hidden;
    max-height: 300px;
    min-width: 275px;
    background-color: #fff;
    color: #000;
    border-radius: 3px;
    position: absolute;
    z-index: 1;
    top: 95%;
    right: -16%;
    margin-left: -58px;
    box-shadow: #bfbfbf 0px 2px 8px 0px;
    cursor: pointer;
    transition: display .6s;
    overflow: auto;
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
    min-height: 24px;

    &:hover ${NotifyList} {
        visibility: visible;
    }
`

export const NotifyIcon = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding-right: 10px;
    border-right: 1px solid #fff;
    
`

export const Badge = styled.div`
    position: absolute;
    top: -7px;
    left: 16px;
    display: flex;
    align-items: center;
    height: 16px;
    padding: 0 5px;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    text-align: center;
    background: #ff4d4f;
    border-radius: 10px;
`