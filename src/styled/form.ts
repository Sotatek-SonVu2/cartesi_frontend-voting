import styled from "styled-components";
import { colorTheme } from "./common";

export const Wrapper = styled.div`
    display: block;
`

export const Form = styled.form`
    margin-top: 2rem;
`

export const FormItem = styled.div`
    margin-bottom: 10px;
`

export const ActionColumn = styled.div`
  display: flex;
  justify-content: center;

  & img {
    margin: 0px 3px;
    cursor: pointer;
  }
`

export const OptionLabel = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 6px 10px 0px;

    & img{
        cursor: pointer;
    }
`

export const Input = styled.input`
    width: 100%;
    font-size: 16px;
    padding: 10px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    font-family: monospace;
`


export const TextArea = styled.textarea`
    width: 100%;
    height: 90px;
    padding: 10px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    resize: none;
    outline: none;
`

export const ErrorText = styled.div`
    color: ${colorTheme.error};
    font-size: 14px;
    line-height: normal;
    font-family: monospace;
    margin-bottom: 5px;
`

export const CheckboxGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 10px;
`

export const WaitingMessage = styled.span`
    display: block;
    text-align: center;
    font-size: 13px;
    font-style: italic;
    color: red;
`