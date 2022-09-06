import React from "react"
import styled from "styled-components";
import cartesiLogo from '../images/Cartesi_Logo_White.svg';

const LogoImage = styled.img`
    position: fixed;
    right: 20px;
    bottom: 20px;
`

const Background = ({ children }: { children: React.ReactElement }) => {
    return (
        <React.Fragment>
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            {children}
            <LogoImage src={cartesiLogo} alt="cartesi logo" width={110} />
        </React.Fragment>
    )
}

export default Background