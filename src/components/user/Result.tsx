import Loading from 'common/Loading'
import Markdown from 'common/Markdown'
import NoData from 'common/NoData'
import Title from 'common/Title'
import ProfileHandle from 'handles/profile.handle'
import ResultHandle from 'handles/result.handle'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { colorTheme, Content, DefaultButton, FlexLayoutBtn, Line } from 'styled/common'
import { LargeContainer, RightWrapper } from 'styled/main'
import { CampaignType, ProfileHandleRes, ResultHandleRes } from 'utils/interface'
import ResultItem from './Item/Result'
import ProfileInfor from './Profile/Infor'
import VotersList from './VotersList'

const Wrapper = styled(RightWrapper)`
	background: unset;
`

const ResultStyled = styled.div`
	background: ${colorTheme.tranparent};
`

const Result = () => {
	const navigate = useNavigate()
	const { profileId, type } = useParams()
	const { getLists, data, isLoading }: ResultHandleRes = ResultHandle()
	const {
		data: profileData,
		isLoading: profileLoading,
		getProfileDetail,
	}: ProfileHandleRes = ProfileHandle()
	const { campaign, title, voted_candidate, description } = data

	useEffect(() => {
		getLists()
		if (profileId) {
			getProfileDetail()
		}
	}, [profileId])

	return (
		<LargeContainer>
			{type === 'org' && (
				<ProfileInfor data={profileData} isLoading={profileLoading} isActionButton={false} />
			)}
			<Wrapper isFullWrapper={type === 'user'}>
				<ResultStyled>
					{isLoading ? (
						<Loading />
					) : (
						<Content>
							<Title text={title || '(NO DATA)'} userGuideType='result' />
							<div style={{ marginTop: '1rem' }}>
								<Markdown text={description} />
							</div>
							<Line />
							<p>The total votes is {campaign?.length > 0 ? campaign[0].total_vote : 0}.</p>
							{voted_candidate?.name && <span>You voted for: {voted_candidate?.name}.</span>}
							{campaign?.length > 0 ? (
								campaign.map((item: CampaignType) => (
									<div key={item.id}>
										<ResultItem data={item} voted_candidate={voted_candidate} />
									</div>
								))
							) : (
								<NoData />
							)}
							<FlexLayoutBtn>
								<DefaultButton type='button' onClick={() => navigate(-1)}>
									Back
								</DefaultButton>
							</FlexLayoutBtn>
						</Content>
					)}
				</ResultStyled>
				<VotersList />
			</Wrapper>
		</LargeContainer>
	)
}

export default Result
