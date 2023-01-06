import Loading from 'common/Loading'
import NoData from 'common/NoData'
import Pagination from 'common/Pagination'
import Title from 'common/Title'
import YourFollowingHandle from 'handles/your-following.handle'
import { useEffect } from 'react'
import { Content } from 'styled/common'
import { ProfileCampaignDataType, YourFollowingHandleRes } from 'utils/interface'
import CampaignItem from './Item/Campaign'

const YourFollowing = () => {
	const { getLists, setPaging, paging, data, isLoading }: YourFollowingHandleRes =
		YourFollowingHandle()

	useEffect(() => {
		getLists()
	}, [paging.currentPage])
	console.log('data', data)
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<Content>
					<Title text='Your following' />
					{data?.length > 0 ? (
						data?.map((item: ProfileCampaignDataType) => (
							<div key={item.id}>
								<CampaignItem data={item} />
							</div>
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
				</Content>
			)}
		</>
	)
}

export default YourFollowing
