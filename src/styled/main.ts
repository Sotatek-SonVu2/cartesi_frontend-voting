import styled from 'styled-components'
import { colorTheme } from './common'

interface ContainerType {
	isFullWrapper?: boolean
}

export const MainWrapper = styled.div`
	background: ${colorTheme.background};
	min-height: 100vh;
	overflow: hidden;
`

export const Container = styled.div<ContainerType>`
	margin-left: auto;
	margin-right: auto;
	max-width: 50rem;
	${(props) => props.isFullWrapper && `max-width: 1012px;`}
	@media (max-width: 742px) {
		margin: 10px;
	}
`

export const LargeContainer = styled(Container)`
	position: relative;
	max-width: 1012px;
`

export const RightWrapper = styled.div<ContainerType>`
	background: ${colorTheme.tranparent};
	${(props) =>
		props.isFullWrapper
			? `
            display: block;
            width: 80%;
            margin: 0 auto;
        `
			: `
			float: right;
            width: 69%;
        `}
	min-height: 0;
	border-radius: 8px;
	transition: 0.2s;
	overflow: hidden;
	margin-bottom: 3rem;

	@media (max-width: 1000px) {
		width: 100%;
		float: unset;
	}
`

export const FlexLayout = styled.div`
	display: flex;
	align-items: center;
`

export const FlexLayoutSwap = styled(FlexLayout)`
	flex-wrap: wrap;
`

export const FlexItem = styled.div`
	width: 250px;
`

export const ContentWrapper = styled.div`
	background: ${colorTheme.tranparent};
	display: block;
	flex-shrink: 0;
	margin: 0 auto;
	min-height: 0;
	border-radius: 8px;
	transition: 0.2s;
	overflow: hidden;
	margin-bottom: 3rem;
`

export const Title = styled.h3`
	font-size: 35px;
	color: #fff;
	text-align: center;
	margin-top: 3rem;
	margin-bottom: 10px;
`

export const SubTitle = styled.p`
	font-size: 20px;
	color: #fff;
	text-align: center;
	margin-bottom: 3rem;
`

export const Setting = styled.img`
	position: fixed;
	left: 20px;
	bottom: 20px;
	cursor: pointer;
`
