import EmptyIcon from 'images/no-data.png'
import { NoDataWrapper } from 'styled/common'

interface PropsType {
	style?: any
	iconStyle?: any
	text?: string
}

const NoData = ({ style, iconStyle, text }: PropsType) => {
	return (
		<NoDataWrapper style={{ ...style }}>
			<img src={EmptyIcon} alt='empty icon' style={{ ...iconStyle }} />
			<p>{text || 'No Data'}</p>
		</NoDataWrapper>
	)
}

export default NoData
