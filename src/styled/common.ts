import styled from 'styled-components';

interface BoxContentType {
    active?: boolean
    checked?: boolean
}

interface PaginationType {
    selected?: boolean
    disabled?: boolean
}

export const colorTheme = {
    background: 'radial-gradient(ellipse at bottom,#1b2735 0%,#090a0f 100%)',
    darkBlue: '#1E1941',
    gray: '#f3f4f6',
    white: '#ffff',
    borderGray: '#dadce0',
    primary: '#2e6da4',
    default: '#f3f4f6',
    success: '#3eb991',
    choose: '#b4d5ffb3',
    error: '#d93025',
    danger: '#d9534f'
}

export const Button = styled.button`
    color: #fff;
    font-size: 15px;
    padding: 10px 25px;
    border-radius: 7px;
    cursor: pointer;
`

export const PrimaryButton = styled(Button)`
    border: 1px solid #fff;
    background-color: ${colorTheme.primary};
`

export const DangerButton = styled(Button)`
border: 1px solid #fff;
background-color: ${colorTheme.danger};
`

export const SuccessButton = styled(Button)`
    border: 1px solid #fff;
    background-color: ${colorTheme.success};
`

export const DefaultButton = styled(Button)`
    border: 1px solid ${colorTheme.borderGray};
    background-color: ${colorTheme.default};
    color: #000;
`

export const FlexLayoutBtn = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 2rem;
`

export const Content = styled.div`
    padding: 1.5rem;
    position: relative;
    animation: mymove 1s;
    animation-fill-mode: forwards;
    overflow: hidden;
    @keyframes mymove {
        from {left: 42rem;}
        to {left: 0px}
    }
`

export const Title = styled.div`
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2rem;
    color: #000;
`

export const BoxContent = styled.div<BoxContentType>`
    position: relative;
    width: 100%;
    background: ${colorTheme.white};
    border: ${props => props.checked ? `2px solid #81cec2` : `1px solid ${colorTheme.borderGray}`};
    border-radius: 7px;
    cursor: pointer;
    ${props => props.active && `
        background: ${colorTheme.choose};
        color: ${colorTheme.white};
    `}
`

export const NoDataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 310px;

    & img {
        position: relative;
        display: block;
        margin: 0 auto;
    }

    & p {
        font-size: 14px;
        font-family: "Roboto Mono", monospace;
    }
`

export const ModalContainer = styled.div`
    width: 450px;
    
    & .closeIcon {
        position: absolute;
        top: 8px;
        right: 8px;
        cursor: pointer;
    }
`

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;

    & span {
        color: #000000d9;
        font-weight: 500;
        font-size: 19px;
        line-height: 22px;
        word-wrap: break-word;
    }

    & img {
        cursor: pointer;
    }
`

export const ModalBody = styled.div`
    padding: 20px;
`

export const ModalTitle = styled.div`
    display: flex;
    align-items: center;
    margin: 0;
    color: #000000d9;
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    word-wrap: break-word;

    & img {
        margin-right: 10px;
    }
`

export const ModalContent = styled.div`
    margin-left: 40px;
`

export const PaginationWrapper = styled.ul`
    display: flex;
    justify-content: center;
    list-style-type: none;
`

export const Arrow = styled.div`
    &::before {
        position: relative;
        content: '';
        display: inline-block;
        width: 0.4em;
        height: 0.4em;
        border-right: 0.12em solid rgba(0, 0, 0, 0.87);
        border-top: 0.12em solid rgba(0, 0, 0, 0.87);
    }
`

export const ArrowLeft = styled(Arrow)`
    transform: rotate(-135deg) translate(-50%);
`

export const ArrowRight = styled(Arrow)`
    transform: rotate(45deg);
`

export const PaginationItem = styled.li<PaginationType>`
    padding: 0 12px;
    height: 32px;
    text-align: center;
    margin: auto 4px;
    color: rgba(0, 0, 0, 0.87);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    letter-spacing: 0.01071em;
    border-radius: 16px;
    line-height: 1.43;
    font-size: 13px;
    min-width: 32px;
    cursor: pointer;
    
    & .dots:hover {
        background-color: transparent;
        cursor: default;
    }

    ${props => props.selected && `
        background-color: ${colorTheme.darkBlue};
        color: #fff;
    `}

    ${props => props.disabled && `
        pointer-events: none;

        &:hover {
            background-color: transparent;
            cursor: default;
        }

        & .arrow::before {
            border-right: 0.12em solid rgba(0, 0, 0, 0.43);
            border-top: 0.12em solid rgba(0, 0, 0, 0.43);
        }
    `}
    
`

