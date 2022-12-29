import styled from 'styled-components'

interface TabLabelType {
	active: boolean
}

export const TabPane = styled.div`
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid #6c6b6b;
	cursor: pointer;
`

export const TabLabel = styled.p<TabLabelType>`
	margin: 0;
	padding: 0 0 5px;
	border-bottom: ${(props) => (props.active ? '1px solid #1890ff' : '0px')};
	color: ${(props) => (props.active ? '#1890ff' : '#fff')};
	width: 100%;
	text-align: center;
`

export const TabContent = styled.div`
	margin-top: 1rem;
`
