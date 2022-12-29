import QuestionIcon from 'images/question-icon.png'
import { TitleText, TitleWrapper } from 'styled/common'
import { userGuide } from 'utils/userGuide'
import Tooltip from './Tooltip'

interface PropsType {
	text: string
	userGuideType?: string
	placement?: 'top' | 'right' | 'bottom' | 'left'
	type?: 'dark' | 'success' | 'warning' | 'error' | 'info' | 'light'
	titleStyle?: any
	id?: string
	className?: string //'tooltip-sz-md' | 'tooltip-sz-sm' | 'tooltip-sz-max' | 'tooltip-modal ' | 'tooltip-admin-icon' (index.css)
}

const Title = ({
	text,
	userGuideType,
	placement = 'top',
	type = 'light',
	titleStyle,
	className,
	id = 'title',
}: PropsType) => {
	return (
		<TitleWrapper>
			<TitleText style={{ ...titleStyle }}>{text}</TitleText>
			{userGuideType && (
				<Tooltip
					text={userGuide[userGuideType]}
					placement={placement}
					id={id}
					type={type}
					className={className}>
					<img src={QuestionIcon} alt='question-icon' width={20} />
				</Tooltip>
			)}
		</TitleWrapper>
	)
}

export default Title
