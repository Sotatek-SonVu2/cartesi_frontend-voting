import styled from "styled-components";

interface LoadingType {
   isScreenLoading?: boolean
}

export const Loader = styled.div`
   border: 2px solid #fff;
   border-radius: 50%;
   border-top: 2px solid #3498db;
   width: 10px;
   height: 10px;
   margin-right: 5px;
   position: relative;
   -webkit-animation: spin 2s linear infinite;
   animation: spin 2s linear infinite;

   @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
 `

export const LoadingWrapper = styled.div<LoadingType>`
    ${props => props.isScreenLoading && `
      position: absolute;
      left: 0;
      top: 0;
      background: rgb(0 0 0 / 38%);
      z-index: 10;
    `}

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    min-height: 310px;
    color: #fff;

    & img {
      position: relative;
      display: block;
      margin: 0 auto;
      animation-name: fly;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-direction: alternate-reverse;
    }

    @keyframes fly {
        from {
            bottom: 0;
        }
    
        to {
            bottom: 40px;
        }
      }
`

export const LoadingText = styled.p`
   font-size: 14px;
   font-family: "Roboto Mono", monospace;
   animation: text 4s ease infinite;
   margin-bottom: 0;
   display: block;
   margin: 0 auto;
   width: fit-content;

   @keyframes text {
      0% {
         transform: translateX(-30px);
         letter-spacing: 0px;
      }

      25% {
         letter-spacing: 3px;
      }

      50% {
         transform: translateX(30px);
         letter-spacing: 0px;
      }

      75% {
         letter-spacing: 3px;
         color: $m-03;
      }

      100% {
         transform: translateX(-30px);
         letter-spacing: 0px;
      }
   }
`

