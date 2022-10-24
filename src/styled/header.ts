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

export const NotifyBottom = styled.div`
    background: rgb(238 238 238);
    border-top: 1px solid #eee;
    padding: 5px;
    position: absolute;
    bottom: 0px;
    width: 96%;
    text-align: center;
`

export const NotifyList = styled.div`
    visibility: hidden;
    min-width: 275px;
    background-color: #fff;
    color: #000;
    border-radius: 3px;
    position: absolute;
    z-index: 11;
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
        right: 8%;
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

    & .bellIcon {
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

    & a {
        color: #000;
        text-decoration: none;

        &:hover {
            color: #5260b1
        }
    }
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