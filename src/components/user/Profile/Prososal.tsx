import NoData from 'common/NoData'
import Pagination from 'common/Pagination'
import { PagingType, ProfileCampaignDataType } from 'utils/interface'
import CampaignItem from '../Item/Campaign'

interface PropsType {
	campaigns: ProfileCampaignDataType[]
	paging: PagingType
	setPaging: any
}

const ProfilePrososal = ({ campaigns, paging, setPaging }: PropsType) => {
	return (
		<>
			<h2>Prososal</h2>
			{campaigns?.length > 0 ? (
				campaigns.map((item: ProfileCampaignDataType) => (
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
		</>
	)
}

export default ProfilePrososal
