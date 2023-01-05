import Loading from 'common/Loading'
import NoData from 'common/NoData'
import Pagination from 'common/Pagination'
import Title from 'common/Title'
import CampaignHandle from 'handles/campaign.handle'
import { useEffect } from 'react'
import { Content } from 'styled/common'
import { HeaderList } from 'styled/list'
import { Container, ContentWrapper, FlexLayout } from 'styled/main'
import { CampaignHandleRes, ProfileCampaignDataType } from 'utils/interface'
import CampaignItem from './Item/Campaign'

const CampaignsList = () => {
	const {
		getLists,
		setPaging,
		paging,
		data,
		isLoading,
		setIsMyCampaign,
		isMyCampaign,
		campaignType,
	}: CampaignHandleRes = CampaignHandle()

	const onChangeCheckbox = () => {
		setIsMyCampaign(!isMyCampaign)
	}

	useEffect(() => {
		getLists()
	}, [paging.currentPage, campaignType, isMyCampaign])

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<Content>
					<HeaderList>
						<Title text='List campaigns' />
						<FlexLayout>
							<input
								type='checkbox'
								id='mycampaign'
								name='mycampaign'
								checked={isMyCampaign}
								onChange={onChangeCheckbox}
								style={{ margin: '3px 3px 0px' }}
							/>
							<small>My campaign</small>
						</FlexLayout>
					</HeaderList>

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

export default CampaignsList
