import Loading from "common/Loading"
import Markdown from "common/Markdown"
import Title from "common/Title"
import VoteHandle from "handles/vote.handle"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { ROUTER_PATH } from "routes/contants"
import { RootState } from "store"
import styled from "styled-components"
import { Content, DefaultButton, FlexLayoutBtn, Line, PrimaryButton, SuccessButton } from "styled/common"
import { TextArea } from "styled/form"
import { ContentWrapper } from "styled/main"
import { CandidatesVotingType, tokenType, VoteHandleRes } from "utils/interface"
import VotingItem from "./Item/Voting"

const SubTitle = styled.div`
    text-align: center;
    margin-bottom: 1rem;

    & span {
        color: #FF4B3A;
    }
`

const Voting = () => {
    const { tokenListing } = useSelector((state: RootState) => state.token)
    const { campaignId } = useParams();
    const navigate = useNavigate();
    const {
        getLists,
        data,
        isLoading,
        isCloseVoting,
        isLoadVoting,
        handleVoting,
        onChooseCandidate,
        setComment,
        comment,
        callMessage,
        candidateId,
    }: VoteHandleRes = VoteHandle()

    useEffect(() => {
        getLists()
    }, [campaignId])

    const getInfo = () => {
        const { campaign } = data
        const token = tokenListing.find((token: tokenType) => token.address === campaign?.accept_token)?.name
        return (
            <p>To vote for this campaign, you need {campaign?.fee} {token}</p>
        )
    }

    return (
        <ContentWrapper>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <Title text={data.campaign.name || '(NO DATA)'} userGuideType='vote' />
                    <SubTitle>
                        <p>{data.campaign.start_time} - {data.campaign.end_time}</p>
                        {getInfo()}
                        {isCloseVoting && (
                            <span>This campaign is closed for voting!</span>
                        )}
                    </SubTitle>
                    <Markdown text={data.campaign.description} />
                    <Line />
                    {data.voted?.name && (
                        <p>Your voted is: {data.voted?.name}.</p>
                    )}
                    {data.voted?.comment && (
                        <p>The reason you choose: {data.voted.comment}</p>
                    )}
                    {data?.candidates?.map((item: CandidatesVotingType) => (
                        <div key={item.id}>
                            <VotingItem active={candidateId} data={item} handleClick={(id: number) => onChooseCandidate(id)} />
                        </div>
                    ))}
                    {!data?.voted && (
                        <TextArea name="comment" placeholder="Why you choose that candidate? (optional)" value={comment} onChange={(e) => setComment(e.target.value)} />
                    )}
                    <Line />
                    {data.candidates?.length > 0 && (
                        <FlexLayoutBtn>
                            <DefaultButton type="button" onClick={() => navigate(-1)}>Back</DefaultButton>
                            <SuccessButton
                                type="button"
                                onClick={handleVoting}
                                disabled={isCloseVoting || data.voted?.candidate_id || !candidateId || isLoadVoting}
                            >
                                Vote
                            </SuccessButton>
                            <PrimaryButton type="button" onClick={() => navigate(`${ROUTER_PATH.RESULT}/${campaignId}`)}>Result</PrimaryButton>
                        </FlexLayoutBtn>
                    )}
                    {isLoadVoting && (
                        <Loading isScreenLoading={isLoadVoting} messages={callMessage} />
                    )}
                </Content >
            )}
        </ContentWrapper>
    )
}

export default Voting