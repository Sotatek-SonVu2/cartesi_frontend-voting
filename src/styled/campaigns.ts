import styled from 'styled-components'
import { colorTheme } from './common'

interface StatusType {
	isStartTime: boolean
	isEndTime: boolean
}

export const Wrapper = styled.div`
	border-radius: 10px;
	border: 1.5px solid #242527;
	cursor: pointer;
	background: rgb(25 6 6 / 50%);
	margin: 1rem 0;
	transition-property: border;
	transition-duration: 0.2s;
	transition-delay: 0.1s;

	&:hover {
		border: 1px solid #e5e7eb;
	}
`

export const Content = styled.div`
	padding: 24px;
`

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

export const Status = styled.div<StatusType>`
	background: linear-gradient(to right, #288bdb, #38b2ff, #69ceff);
	font-size: 13px;
	height: 26px;
	vertical-align: middle;
	padding: 0 12px;
	border-radius: 16px;
	line-height: 26px;

	${(props) =>
		props.isStartTime && `background: linear-gradient(to right, #31AF25, #4CCC33, #80E062);`}
	${(props) =>
		props.isEndTime && `background: linear-gradient(to right, #DB2B2A, #FF4B3A, #FF846B);`}
`

export const UserInfo = styled.div`
	display: flex;
	align-items: center;

	& img {
		width: 22px;
		height: 22px;
		border-radius: 100px;
		object-fit: cover;
		margin-right: 10px;
	}
`

export const DateTime = styled.div`
	margin-top: 16px;
	color: #ccc;
	font-size: smaller;
`

export const ActionList = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 13px;
	border-top: 1px solid #000;
	align-items: center;
	background: rgb(25 6 6 / 80%);
	border-radius: 0px 0px 10px 10px;
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
	// width: 180px;
`

export const WinnerName = styled.div`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`
