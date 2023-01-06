import Loading from 'common/Loading'
import NoData from 'common/NoData'
import Pagination from 'common/Pagination'
import Tooltip from 'common/Tooltip'
import VoterHandle from 'handles/voter.handle'
import CommentIcon from 'images/comment.svg'
import { useEffect } from 'react'
import styled from 'styled-components'
import { TitleText } from 'styled/common'
import { VotesItem } from 'styled/list'
import { ContentWrapper } from 'styled/main'
import { formatAddress } from 'utils/common'
import { VoterHandleRes, VoterType } from 'utils/interface'

const Wrapper = styled(ContentWrapper)`
	border-radius: 4px;
	margin-top: 25px;
	color: #fff;
`

const Title = styled(TitleText)`
	border-bottom: 1px solid #5b5b5b;
	padding: 7px 1.5rem;
	font-size: 20px;
	margin-right: 0px;
`

const VotersList = () => {
	const { isLoading, paging, items, setPaging, getData }: VoterHandleRes = VoterHandle()

	useEffect(() => {
		getData()
	}, [paging.currentPage])

	return (
		<Wrapper>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Title>Votes ({items.length})</Title>
					{items.length > 0 ? (
						items.map((item: VoterType) => (
							<VotesItem key={item.user}>
								<div>{formatAddress(item.user)}</div>
								<div>{item.name}</div>
								{item.comment && (
									<Tooltip text={item.comment} id={item.user} placement='top'>
										<img src={CommentIcon} alt='comment' width={20} />
									</Tooltip>
								)}
							</VotesItem>
						))
					) : (
						<NoData />
					)}
					<Pagination
						currentPage={paging.currentPage}
						totalCount={paging.totalPage}
						pageSize={paging.pageSize}
						onPageChange={(page: number) => {
							setPaging({ ...paging, currentPage: page })
						}}
					/>
				</>
			)}
		</Wrapper>
	)
}

export default VotersList
