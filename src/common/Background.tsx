import React from "react"

const Background = ({ children }: { children: React.ReactElement }) => {
    return (
        <React.Fragment>
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            {children}
        </React.Fragment>
    )
}

export default Background