import styled from 'styled-components'
import { colorTheme, Content, DangerButton, PrimaryButton, SuccessButton } from './common'
import { BoxItem, ContentBox } from './list'
import { Container } from './main'

interface TabsType {
	isActive?: boolean
}

export const ProfileContainer = styled(Container)`
	position: relative;
	max-width: 1012px;
`

export const ProfileInforWrapper = styled.div`
	float: left;
	background: ${colorTheme.tranparent};
	width: 240px;
	padding: 1.5rem;
	margin-bottom: 3rem;
`

export const ProfileDetailWrapper = styled.div`
	background: ${colorTheme.tranparent};
	float: right;
	width: 69%;
	min-height: 0;
	border-radius: 8px;
	transition: 0.2s;
	overflow: hidden;
	margin-bottom: 3rem;
`

export const ProfileDetailContent = styled(Content)`
	padding: 0 1.5rem;
`

export const ProfileInforContent = styled.div`
	position: relative;
	color: #fff;
	text-align: center;
	height: 100%;

	& .thumbnail {
		margin-bottom: 1rem;
		object-fit: cover;
		border-radius: 9999px;
	}

	& p {
		margin: 1rem;
		font-size: 15px;
	}
`

export const ProfileInforBottom = styled.div`
	// position: absolute;
	// bottom: 0;
	width: 100%;
`

export const BtnAction = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const Tabs = styled.p<TabsType>`
	background: ${(props) => (props.isActive ? colorTheme.active : '')};
	padding: 7px 0;
	cursor: pointer;

	&:hover {
		background: ${colorTheme.active};
	}
`

export const Links = styled.div`
	text-align: center;
	display: flex;
	justify-content: space-around;
	width: 100%;
	margin-top: 20px;
`

export const ProfileDetailHeader = styled.div`
	color: #fff;
	display: flex;
	align-items: center;

	& img {
		margin-right: 1rem;
		object-fit: cover;
		border-radius: 9999px;
	}

	& p {
		margin: 0;
		font-size: 15px;
	}
`

export const ItemContent = styled(ContentBox)`
	& h5 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	& .image {
		border-radius: 9999px;
		object-fit: cover;
	}
`

export const ProfileName = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 24px;
	margin-bottom: 10px;
	font-weight: 600;
`

export const ProfileDesc = styled.div`
	margin: 20px 0;
`

export const ProfileBox = styled(BoxItem)`
	padding: 0 10px;
	min-width: 148px;
	margin-right: 10px;
	margin-left: 10px;
`

export const AddButton = styled(SuccessButton)`
	padding: 0;
	font-size: 23px;
	width: 60px;
	border-radius: 15px;
`

export const JoinButton = styled(SuccessButton)`
	padding: 0;
	width: 100%;
	border-radius: 23px;
	height: 33px;
	font-size: 13px;
	margin: 15px 0;
`

export const LeaveButton = styled(DangerButton)`
	padding: 0;
	width: 100%;
	border-radius: 23px;
	height: 33px;
	font-size: 13px;
	margin-bottom: 15px;
`

export const ProfileButton = styled(SuccessButton)`
	display: block;
	margin: 0 auto;
	padding: 7px 18px;
	margin-bottom: 20px;
	margin-top: 2rem;
	width: 75%;
	justify-content: center;
	border-radius: 23px;
`

export const CreateButton = styled(SuccessButton)`
	padding: 0;
	width: 100%;
	border-radius: 23px;
	height: 33px;
	font-size: 13px;
	margin: 15px 0;
`

export const EditButton = styled(PrimaryButton)`
	padding: 0;
	width: 100%;
	border-radius: 23px;
	height: 33px;
	font-size: 13px;
	margin-bottom: 15px;
`

export const DeleteButton = styled(DangerButton)`
	padding: 0;
	width: 100%;
	border-radius: 23px;
	height: 33px;
	font-size: 13px;
	margin-bottom: 15px;
`

export const SubmitButton = styled(SuccessButton)`
	display: flex;
	align-items: center;
`
