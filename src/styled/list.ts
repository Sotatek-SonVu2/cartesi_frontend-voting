import styled from "styled-components";
import { colorTheme } from "./common";

interface AvatarType {
  bgColor?: string
}

interface ProcessType {
  percent: number
  bgColor?: string
  itemId: number
}

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
  & img {
    cursor: pointer;
  }
`
export const ResultItem = styled.div`
  width: 80%;
  padding: 5px 10px;
  position: relative;
  display: flex;
  align-items: center;
`

export const ItemList = styled.div`
  width: 90%;
  padding: 5px 10px;
  position: relative;
  border-right: 1px solid #ccc;
`

export const FlexList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  padding: 5px 10px;
  position: relative;
`

export const ActionList = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${colorTheme.gray};
  align-items: center;
  margin-top: 20px;
  background: #f0f0f0;
  border-radius: 0px 0px 7px 7px;
`

export const ActionItem = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  text-align: center;
  width: 100%;

  & img {
    margin-right: 5px;
  }
`

export const ItemIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45PX;
  border-radius: 0px 7px 7px 0px;
`

export const Avatar = styled.div<AvatarType>`
  position: relative;
  display: inline-block;
  background: ${props => props.bgColor || '#2684ff'};
  color: #fff;
  height: 28px;
  width: 28px;
  overflow: hidden;
  border-radius: 50%;
  text-align: center;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  margin-right: 5px;
`

export const AvatarText = styled.div`
  margin-top: 2px;
  text-align: center;
`

export const ProcessBar = styled.div<ProcessType>`
  width: ${props => props.percent}%;
  background-color: ${props => props.bgColor};
  position: absolute;
  height: 100%;
  border-radius: 7px 0px 0px 7px;
  animation-name: processbar${props => props.itemId};
  animation-duration: 3s;

  @keyframes processbar${props => props.itemId} {
    from {width: 0px;}
    to {width: ${props => props.percent}%;}
  }
`

export const VotingRate = styled.span`
  position: relative;
  text-align: center;
  font-size: 14px;
  margin: 8px;
`

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;

  & .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 130%;
    left: 50%;
    margin-left: -58px;
  }

  & .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  &:hover .tooltiptext {
    visibility: visible;
  }
`