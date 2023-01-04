import styled from 'styled-components'
import { DangerButton, PrimaryButton, SuccessButton } from './common'
import { BoxItem, ContentBox } from './list'

export const ProfileInfo = styled.div`
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
	width: 178px;
	padding: 0 10px;
	min-width: 178px;
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
	width: 120px;
	border-radius: 23px;
	height: 40px;
`

export const LeaveButton = styled(DangerButton)`
	padding: 0;
	width: 120px;
	border-radius: 23px;
	height: 40px;
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

export const EditButton = styled(PrimaryButton)`
	padding: 0;
	width: 70px;
	border-radius: 23px;
	height: 33px;
	font-size: 13px;
	margin-right: 10px;
`

export const DeleteButton = styled(DangerButton)`
	padding: 0;
	width: 70px;
	border-radius: 23px;
	height: 33px;
	font-size: 13px;
`

export const SubmitButton = styled(SuccessButton)`
	display: flex;
	align-items: center;
`
