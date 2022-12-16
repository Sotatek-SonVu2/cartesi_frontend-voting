import Loading from "common/Loading"
import Markdown from "common/Markdown"
import NoData from "common/NoData"
import Title from "common/Title"
import ResultHandle from "handles/result.handle"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ROUTER_PATH } from "routes/contants"
import { Content, DefaultButton, FlexLayoutBtn, Line } from "styled/common"
import { ContentWrapper } from "styled/main"
import { CampaignType } from "utils/interface"
import ResultItem from "./Item/Result"
import VotersList from "./VotersList"

const Result = () => {
    const navigate = useNavigate();
    const { campaignId } = useParams();
    const {
        getLists,
        data,
        isLoading,
    }: any = ResultHandle()
    const { campaign, title, voted_candidate, description } = data

    useEffect(() => {
        getLists()
    }, [])

    return (
        <>
            <ContentWrapper>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Content>
                        <Title
                            text={title || '(NO DATA)'}
                            userGuideType='result'
                        />
                        <div style={{ marginTop: '1rem' }}>
                            <Markdown text={description} />
                        </div>
                        <Line />
                        <p>The total votes is {campaign?.length > 0 ? campaign[0].total_vote : 0}.</p>
                        {voted_candidate?.name && (
                            <span>You voted for: {voted_candidate?.name}.</span>
                        )}
                        {campaign?.length > 0 ? campaign.map((item: CampaignType) => (
                            <div key={item.id}>
                                <ResultItem data={item} voted_candidate={voted_candidate} />
                            </div>
                        )) : (
                            <NoData />
                        )}
                        <FlexLayoutBtn>
                            <DefaultButton type="button" onClick={() => navigate(`${ROUTER_PATH.VOTING}/${campaignId}`)}>Back</DefaultButton>
                        </FlexLayoutBtn>
                    </Content>
                )}
            </ContentWrapper>
            <VotersList />
        </>
    )
}

export default Result