import styled from "styled-components";
import { colorTheme } from "./common";

interface AvatarType {
  bgColor?: string
}

interface ProcessType {
  percent: number | string
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
export const ResultName = styled.div`
  width: 80%;
  text-align: justify;
  padding: 5px 10px;
  position: relative;
  display: flex;
  align-items: center;
`

export const VotingName = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  text-align: justify;
  padding: 5px 10px;
  position: relative;
  border-right: 1px solid #ccc;
`

export const CampaignName = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: justify;
  padding: 15px 10px;
  position: relative;
`

export const ActionList = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  border-top: 1px solid ${colorTheme.gray};
  align-items: center;
  background: #f3f4f6;
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

export const WinnerCandidate = styled.div`
  display: flex;
  margin-left: 7px;
  width: 180px;
`

export const WinnerName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  min-width: 28px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-items: center;
  height: 100%;
  line-height: 100%;
  text-align: center;
`

export const ProcessBar = styled.div<ProcessType>`
  width: ${props => props.percent}%;
  background-color: ${props => props.bgColor};
  position: absolute;
  height: 100%;
  border-radius: 7px;
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

export const BoxItem = styled.div`
  background: rgb(195 195 195 / 14%);
  width: 23%;
  margin-top: 20px;
  margin-right: 10px;
  border-radius: 7px;
  cursor: pointer;
  transition: box-shadow .3s;

  &:hover {
    box-shadow: #f3f4f687 0px 0px 15px;
  }
`

export const WithdrawContent = styled.div`
  color: #fff;
  text-align: center;

  & img {
    display: block;
    margin: 0 auto;
    margin-top: 24px;
  }
`

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;

  & .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #fff;
    color: #000;
    text-align: center;
    border-radius: 3px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -58px;
    box-shadow: #bfbfbf 0px 2px 8px 0px;
  }

  & .tooltiptext::after {
    content: "";
    position: absolute;
    top: -30%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #f3f4f6 transparent;
  }

  &:hover .tooltiptext {
    visibility: visible;
  }
`