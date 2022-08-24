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
    color: #fff;
    text-align: right;
    font-size: 13px;
    font-family: Euclid, Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.5rem;

    & .logoutIcon {
        margin-left: 15px;
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