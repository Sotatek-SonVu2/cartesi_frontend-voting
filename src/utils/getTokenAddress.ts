import { tokenType } from 'utils/interface'

const getTokenAddress = (tokenListing: tokenType[], tokenName: string) => {
	const token_address = tokenListing.find((item: tokenType) => item.name === tokenName)?.address
	return token_address
}

export default getTokenAddress
