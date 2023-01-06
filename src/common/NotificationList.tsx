import NotificationHandle from 'handles/notification.handle'
import EmptyIcon from 'images/empty_notifications.svg'
import NotificationIcon from 'images/notification.svg'
import BellError from 'images/notify_error.svg'
import BellSuccess from 'images/notify_success.svg'
import reloadIcon from 'images/reload.png'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PROSOSAL, ROUTER_PATH } from 'routes/contants'
import styled from 'styled-components'
import { NoDataWrapper, ReloadImage } from 'styled/common'
import {
	Badge,
	NotifyBottom,
	NotifyContent,
	NotifyHeader,
	NotifyIcon,
	NotifyItem,
	NotifyList,
	NotifySection,
} from 'styled/header'
import { FlexLayout } from 'styled/main'
import { NotificationHandleRes } from 'utils/interface'

const EmptyNotification = styled(NoDataWrapper)`
	min-height: 200px;

	& p {
		color: #000;
	}
`

const PAGE_DEFAULTS = {
	currentPage: 1,
	pageSize: 10,
	totalPage: 0,
}

const getMessage = (item: any) => {
	const { action, payload } = item
	const parse = JSON.parse(payload)
	const { campaign, type, error, candidate, amount, reason, token, profile, time } = parse
	const tokenIcon = token?.icon || ''
	const tokenName = token?.name || ''
	const successMessage: any = {
		CREATE_CAMPAIGN: (
			<span>
				You created campaign successfully!
			</span>
		),
		VOTE: (
			<span>
				You voted for candidate {candidate?.name} in campaign successfully!
			</span>
		),
		DEPOSIT: (
			<span>
				You deposited to the DApp {amount} <img src={tokenIcon} alt='token_icon' width={10} />{' '}
				{tokenName} tokens successfully.
			</span>
		),
		EDIT_CAMPAIGN: (
			<span>
				You edited info of campaign {campaign?.name} successfully
			</span>
		),
		DECREASE_TOKEN: (
			<span>
				You had been charged {amount} <img src={tokenIcon} alt='token_icon' width={10} />{' '}
				{tokenName} tokens because {reason}
			</span>
		),
		DELETE_CAMPAIGN: <span>You deleted campaing {campaign?.name} successfully</span>,
		WITHDRAW: (
			<Link to={ROUTER_PATH.WITHDRAW}>
				You requested to withdraw {amount} <img src={tokenIcon} alt='token_icon' width={10} />{' '}
				{tokenName} tokens successfully.
			</Link>
		),
		CREATE_PROFILE: (
			<span>
				You created profile{' '}
				<Link to={`${ROUTER_PATH.PROFILE}/${profile?.id}${PROSOSAL}`}>{profile?.name} </Link> successfully
			</span>
		),
		UPDATE_PROFILE: (
			<span>
				You edited info of profile{' '}
				<Link to={`${ROUTER_PATH.PROFILE}/${profile?.id}${PROSOSAL}`}>{profile?.name} </Link> successfully
			</span>
		),
		DELETE_PROFILE: (
			<span>
				You deleted profile {profile?.name} at {time} successfully
			</span>
		),
		JOIN_PROFILE: (
			<span>
				You joined profile:{' '}
				<Link to={`${ROUTER_PATH.PROFILE}/${profile?.id}${PROSOSAL}`}>{profile?.name} </Link>
			</span>
		),
		LEAVE_PROFILE: (
			<span>
				You left profile: <Link to={`${ROUTER_PATH.PROFILE}/${profile?.id}${PROSOSAL}`}>{profile?.name} </Link>
			</span>
		),
	}

	const errorMessage: any = {
		CREATE_CAMPAIGN: (
			<span>
				Create campaign {campaign?.name} failed because {error}
			</span>
		),
		VOTE: (
			<span>
				Vote for candidate in campaign {campaign?.name} failed because {error}
			</span>
		),
		DEPOSIT: (
			<span>
				Deposit {amount} <img src={tokenIcon} alt='token_icon' width={10} /> {tokenName} token to
				DApp failed because {error}
			</span>
		),
		EDIT_CAMPAIGN: (
			<span>
				Edit campaign {campaign?.name} failed because {error}
			</span>
		),
		DELETE_CAMPAIGN: (
			<span>
				Delete campaign {campaign?.name} failed because {error}
			</span>
		),
		WITHDRAW: (
			<span>
				Withdraw {amount} <img src={tokenIcon} alt='token_icon' width={10} /> {tokenName} token
				failed because {error}
			</span>
		),
		SYSTEM: <span>System error: {error}</span>,
		CREATE_PROFILE: (
			<span>
				Create profile {profile?.name} failed because {error}
			</span>
		),
		UPDATE_PROFILE: (
			<span>
				Edit profile <Link to={`${ROUTER_PATH.PROFILE}/${profile?.id}${PROSOSAL}`}>{profile?.name} </Link>{' '}
				failed because {error}
			</span>
		),
		DELETE_PROFILE: (
			<span>
				Delete profile <Link to={`${ROUTER_PATH.PROFILE}/${profile?.id}${PROSOSAL}`}>{profile?.name} </Link>{' '}
				failed because {error}
			</span>
		),
		JOIN_PROFILE: (
			<span>
				You can not join {profile?.name} because {error}
			</span>
		),
		LEAVE_PROFILE: (
			<span>
				You can not leave {profile?.name} because {error}
			</span>
		),
	}
	return {
		icon: type === 'error' ? BellError : BellSuccess,
		message: type === 'error' ? errorMessage[action] : successMessage[action],
	}
}

const NotificationList = () => {
	const { isLoading, items, paging, getData, reloadData, setPaging }: NotificationHandleRes =
		NotificationHandle()
	const { currentPage, totalPage } = paging

	useEffect(() => {
		getData()
		// reload notification
		const myInterval = setInterval(() => {
			setPaging(PAGE_DEFAULTS)
			getData(PAGE_DEFAULTS.currentPage, true)
		}, 60000)

		return () => {
			clearInterval(myInterval)
		}
	}, [])

	return (
		<NotifySection className='notification-step'>
			<NotifyIcon>
				{items.length > 0 && <Badge>{items.length}</Badge>}
				<img src={NotificationIcon} alt='logo' width={20} height={20} className='Icon' />
			</NotifyIcon>
			<NotifyList>
				<NotifyHeader>
					<span className='title'>Notification</span>
					<FlexLayout>
						<ReloadImage
							src={reloadIcon}
							alt='reloadIcon'
							width={12}
							onClick={() => reloadData(true)}
							isLoading={isLoading}
						/>
					</FlexLayout>
				</NotifyHeader>
				<div
					id='scrollableDiv'
					style={{
						height: 300,
						overflow: 'auto',
					}}>
					{items.length > 0 ? (
						items.map((item: any, index: number) => {
							const { icon, message } = getMessage(item)
							return (
								<NotifyItem key={index}>
									<NotifyContent>
										<img src={icon} alt='bellIcon' width={20} height={20} className='bellIcon' />
										{message}
									</NotifyContent>
									<span>{item.time}</span>
								</NotifyItem>
							)
						})
					) : (
						<EmptyNotification>
							<img src={EmptyIcon} alt='emptyIcon' width={70} height={70} />
							<p>No Data</p>
						</EmptyNotification>
					)}
				</div>
				{items.length !== totalPage && (
					<NotifyBottom>
						{!isLoading ? (
							<span onClick={() => getData(currentPage + 1)}>Load more</span>
						) : (
							<span>Loading</span>
						)}
					</NotifyBottom>
				)}
			</NotifyList>
		</NotifySection>
	)
}

export default NotificationList
