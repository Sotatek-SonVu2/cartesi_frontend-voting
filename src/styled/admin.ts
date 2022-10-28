import styled from "styled-components";
import { Button, colorTheme } from "./common";
import { Input } from "./form";
import { FlexLayout } from "./main";



export const InputForm = styled(Input)`
    visibility: hidden;
    width: 0px;
    font-size: 14px;
    padding: 5px;
    margin: 0 0 1rem 0;
    border-radius: 0px;
    transition: width 2s;
`

export const FlexForm = styled(FlexLayout)`
    justify-content: right;
    &:hover ${InputForm} {
        width: 400px;
        visibility: visible;
    }
`

export const CreateButton = styled(Button)`
    background-color: ${colorTheme.success};
    color: #ffffff;
    padding: 5px 10px;
    float: right;
    margin-bottom: 1rem;

    
`

