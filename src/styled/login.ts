import styled from 'styled-components'
import { Button } from './common'

export const Logo = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px 30px;
`

export const Container = styled.div`
	text-align: center;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	max-width: 1280px;
	margin: 0 auto;
	& h1 {
		font-size: 50px;
		margin-bottom: 6px;
	}

	& p {
		font-size: 20px;
		letter-spacing: 1px;
		line-height: 2;
		padding: 10px;
		margin: 0px;
	}

	& span {
		margin-bottom: 2rem;
	}

	@media (max-width: 501px) {
		& h1 {
			font-size: 36px;
		}

		& p {
			font-size: 14px;
		}
	}
`

export const LoginButton = styled(Button)`
	border: 1px solid #fff;
	background-color: transparent;
	font-size: 20px;
	margin-top: 6rem;
`
