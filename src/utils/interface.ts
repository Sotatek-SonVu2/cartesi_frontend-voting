export interface MetadataType {
    msg_sender: string,
    epoch_index: number,
    input_index: number,
    block_number: number,
    timestamp: number
}

export interface AuthState {
    address: string
    metadata: MetadataType
    isLoading: boolean
    deposit_info: {
        amount: number
        used_amount: number
    }
}

export interface isVisibleActionButton {
    creator: string
    isOpenVoting: boolean
}

export interface CampaignState {
    listStatus: string
    isVisibleActionButton: isVisibleActionButton
}


export interface OptionType {
    name: string
    brief_introduction: string
    avatar: string
    formErrors: {
        name: string,
        brief_introduction: string
    }
}

export interface CadidatesType {
    name: string
    avatar: string,
    brief_introduction: string
}

export interface DataPayloadType {
    action: string,
    name: string,
    id?: number,
    description: string,
    start_time: string,
    end_time: string,
    candidates: CadidatesType[]
}

export interface DescriptionType {
    name: string
    description: string
}

export interface VotedType {
    campaign_id: number
    candidate_id: number
    id: number
    user: string
    voting_time: string
    name: string
}

export interface CampaignType {
    brief_introduction: string
    campaign_id: number
    id: number
    name: string
    votes: number
    avatar: string
    total: number
    total_vote: number
}

export interface CampaignVotingType {
    creator: string
    description: string
    end_time: string
    id: number
    name: string
    start_time: string
}

export interface CandidatesVotingType {
    brief_introduction: string
    campaign_id: number
    id: number
    name: string
    votes: number
    avatar: string
}

export interface DepositInfoType {
    amount: number,
    used_amount: number
}



