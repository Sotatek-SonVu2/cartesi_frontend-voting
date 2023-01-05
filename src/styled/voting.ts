import styled from 'styled-components'
import { colorTheme } from './common'
import { Container } from './main'

interface WrapperType {
	isFullWrapper?: string | undefined
}

export const VotingContainer = styled(Container)`
	position: relative;
	max-width: 1012px;
`

export const VotingWrapper = styled.div<WrapperType>`
	background: ${colorTheme.tranparent};
	${(props) =>
		props.isFullWrapper
			? `
            float: right;
            width: 69%;
        `
			: `
            display: block;
            width: 80%;
            margin: 0 auto;
        `}
	min-height: 0;
	border-radius: 8px;
	transition: 0.2s;
	overflow: hidden;
	margin-bottom: 3rem;
`
