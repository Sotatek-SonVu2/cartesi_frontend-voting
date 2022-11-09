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

interface CoinBoxStyled {
  active?: boolean
}

interface DepositInfoBoxType {
  is_disabled?: boolean
}

interface StatusTextType {
  is_disabled?: boolean
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

export const HistoryTitle = styled.div`
  display: flex;
  align-items: center;
  text-align: justify;
  position: relative;

  & img {
    margin-right: 10px;
  }

  & p {
    margin: 0px;
  }
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
  min-width: 137px;
  min-height: 242px;
  margin-top: 20px;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 7px;
  cursor: pointer;
  transition: box-shadow .3s;

  &:hover {
    box-shadow: #f3f4f687 0px 0px 15px;
  }

  &:hover img{
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    perspective: 1000px;
  };

  @keyframes shake {
      10%, 90% {
          transform: translate3d(-1px, 0, 0);
      }
      20%, 80% {
          transform: translate3d(2px, 0, 0);
      }
      30%, 50%, 70% {
          transform: translate3d(-4px, 0, 0);
      }
      40%, 60% {
          transform: translate3d(4px, 0, 0);
      }
  };
`

export const WithdrawContent = styled.div`
  color: #fff;
  text-align: center;

  & .giftIcon {
    display: block;
    margin: 0 auto;
    margin-top: 24px;
  }

  & h5 {
    margin-top: 15px;
    margin-bottom: 10px;
  }

  & span {
    font-size: 12px;
    display: block;
  }

  & div {
    height: 2px;
    background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,0), #ffffff, rgba(255,0,0,0), rgba(255,0,0,0));
    margin-top: 25px;
  }
`



export const HeaderList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
`

export const Radio = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-size: 13px;
`

export const TimeLine = styled.div`
  margin: 2rem 0px;
  color: #fff;

  & ul {
    box-sizing: border-box;
    color: #000000d9;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    font-feature-settings: "tnum";
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
  }

  & li {
    position: relative;
    margin: 0;
    padding-bottom: 20px;
    font-size: 14px;
    list-style: none;
  }

  & .timeline-tail {
    position: absolute;
    top: 15px;
    left: 51%;
    height: calc(100% - 10px);
    border-left: 2px solid #fff;
    
  }

  & .timeline-head {
    left: 50%;
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border: 2px solid blue;
    border-radius: 100px;
    color: blue;
  }

  & .timeline-content {
    position: relative;
    left: calc(50% - 4px);
    width: calc(50% - 44px);
    color: #fff;
    word-break: break-word;
    margin: 0 0 0 26px;
    padding: 10px;
    border-radius: 8px;

    & a {
      text-decoration: unset;
      color: #fff;
    }

    & a:hover {
      text-decoration: underline;
      color: #fff;
    }
  }

  & .timeline-item-right {
    left: 0;
    width: 45%;
    margin: 0px;
  }
`

export const CoinItem = styled.div<CoinBoxStyled>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colorTheme.borderGray};
  width: 24%;
  padding: 10px 15px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;

  & span {
    margin-left: 5px;
    font-size: 15px;
  }

  ${props => props.active && `
    border: 1px solid ${colorTheme.active};
    background: ${colorTheme.active};
    color: #fff
  `}
`

export const DepositInfoBox = styled.div<DepositInfoBoxType>`
  position: relative;
  padding: 10px;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
  background: ${props => props.is_disabled ? '#aeaeae8f' : '#216ba5ab'};
  width: 180px;
  margin: 0px 12px 10px;
  border-radius: 4px;

  & .tooltip-box {
      width: 180px;
      visibility: hidden;
      background-color: #fff;
      color: #000;
      text-align: center;
      padding: 5px 10px;
      position: absolute;
      z-index: 11;
      top: 100%;
      left: 0;
      box-shadow: #bfbfbf 0px 2px 8px 0px;

      & p {
          font-size: 13px;
          margin: 0px;
          line-height: 1.5;
      }

      & small {
        font-size: 11px;
        color: ${props => props.is_disabled ? `${colorTheme.error}` : `${colorTheme.success}`}; 
      }
  }

  &:hover .tooltip-box {
    visibility: visible;
  }
`


export const StatusText = styled.small<StatusTextType>`
    background: ${props => props.is_disabled ? `${colorTheme.error}` : `${colorTheme.success}`}; 
    padding: 4px 10px;
    border-radius: 3px;
`