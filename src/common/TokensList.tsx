import styled from 'styled-components'
import { CoinItem } from 'styled/list'
import { Loader } from 'styled/loading'
import { FlexLayout } from 'styled/main'
import { tokenType } from 'utils/interface'

interface PropsType {
	onChooseCoin: (coinToken: string) => void
	tokenType: string
	tokenList: tokenType[]
	isLoading: boolean
	style?: any
}

const CoinWrapper = styled(FlexLayout)`
	justify-content: space-around;
	width: 100%;
	flex-wrap: wrap;
	margin-bottom: 15px;
`

const TokensList = ({ onChooseCoin, tokenType, tokenList, isLoading, style }: PropsType) => {
	return (
		<CoinWrapper style={{ ...style }}>
			{!isLoading ? (
				<>
					{tokenList?.map(({ id, name, icon }) => (
						<CoinItem
							key={id}
							onClick={() => onChooseCoin(name)}
							active={name === tokenType}
							// style={{ width: 'max-content' }}
						>
							<img src={icon} alt='token_icon' width={20} />
							<span>{name}</span>
						</CoinItem>
					))}
				</>
			) : (
				<CoinItem style={{ background: '#99c2ff' }}>
					<Loader />
				</CoinItem>
			)}
		</CoinWrapper>
	)
}

export default TokensList
