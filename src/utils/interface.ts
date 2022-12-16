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
    deposit_info: DepositInfoType[]
    is_admin: boolean
    role: usersType
}

export interface TokenState {
    tokenListing: tokenType[]
    isLoading: boolean
}

export interface OptionType {
    name: string
    brief_introduction: string
    avatar: string
}

export interface ManagerType {
    name: string
}



export interface CadidatesType {
    name: string
    avatar: string,
    brief_introduction: string
}

export interface AddEditDataType {
    action: string,
    name: string,
    id?: number,
    description: string,
    start_time: string,
    end_time: string,
    candidates: CadidatesType[]
    accept_token?: string,
    fee?: number
    token_address?: string
    profile_id?: number | null
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
    fee: number
    accept_token: string
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
    amount: number
    used_amount: number
}

export interface CampaignDataType {
    creator: string
    description: string
    end_time: string
    id: number
    name: string
    start_time: string
    total_vote: number
    votes_of_candidate: number | null
    winning_candidate_name: string
}

export interface ProfileCampaignDataType {
    creator: string
    accept_token: string
    description: string
    end_time: string
    id: number
    fee: number
    name: string
    start_time: string
    total_vote: number
    votes_of_candidate: number | null
    winning_candidate_name: string
    profile_creator: string
    profile_description: string
    profile_id: number
    profile_name: string
    profile_social_media: string | null
    profile_thumbnail: string | null
    profile_type: string
    profile_website: string | null
}

export interface ListCampaignType {
    data: CampaignDataType[]
    limit: number
    page: number
    total: number
    error: string
}

export interface resInput {
    epoch_index?: number
    input_index?: number
}

export interface WithDrawType {
    destination: string
    epoch: number
    input: number
    id: string
    payload: string
    voucher: 0
    amount: number
    isExecuted?: boolean
    isAllowExecute?: boolean
    token: string
}

export interface ProfileType {
    action?: string
    id?: number
    name: string
    description: string
    website: string | null
    social_media: string | null
    thumbnail: string | null
    managers: string[]
    creator?: string
    type?: string
}

export interface CampaignHandleRes {
    getLists: () => void
    getProfileByUser: () => void
    handleChangeDate: (key: string) => (value: Date) => void
    getDataForm: () => void
    onChangeSelect: any
    onSubmit: any
    setTokenToCreate: any
    tokenToCreate: string
    token_to_create: {
        tokenList: tokenType[]
        isLoading: boolean
    }
    setTokenToVote: any
    tokenToVote: string
    token_to_vote: {
        tokenList: tokenType[]
        isLoading: boolean
    }
    setIsMyCampaign: any
    data: any
    isMyCampaign: boolean
    isLoading: boolean
    paging: {
        currentPage: number,
        pageSize: number,
        totalPage: number
    }
    dateTime: {
        startDate: any
        endDate: any
        formErrors: {
            startDate: string
            endDate: string
        }
    }
    setPaging: any
    callMessage: string
    campaignType: string
    success: boolean
}

export interface ProfileHandleRes {
    getProfileDetail: () => void
    getCampaignByProfileId: () => void
    onDeleteProfile: () => void
    getLists: () => void
    setPaging: any
    onSubmit: (data: ProfileType) => void
    toggleModal: () => void
    isOpen: boolean
    paging: {
        currentPage: number,
        pageSize: number,
        totalPage: number
    }
    data: any,
    campaigns: any
    isLoading: boolean
    callMessage: string
}

export interface VoteHandleRes {
    getLists: () => void
    handleVoting: () => void
    onChooseCandidate: any
    setComment: any
    isLoadVoting: boolean
    comment: string
    isCloseVoting: boolean
    candidateId: number
    data: any
    isLoading: boolean
    callMessage: string
    success: boolean
}

export interface DepositInfoType {
    amount: number
    contract_address: string
    id: number
    used_amount: number
    user: string
    withdrawn_amount: number
}

export interface tokenListType {
    key: number
    token_icon: string
    symbol: string
    token_name: string
    address: string
}

export interface tabItemType {
    key: number
    label: string
    content: JSX.Element
}

export interface usersType {
    id?: number
    manage_post: number
    manage_system: number
    manage_token: number
    manage_user: number
    user: string
}

export interface UserForm {
    id?: number
    manage_post: boolean
    manage_system: boolean
    manage_token: boolean
    manage_user: boolean
    user: string
}

export interface usersTypePayload {
    id: number | undefined
    action: string
    manage_post: number
    manage_system: number
    manage_token: number
    manage_user: number
    user: string
}

export interface tokenType {
    id?: number
    fee: number
    name: string
    icon?: string
    address: string
    can_vote: number
    can_create_campaign: number
    status: number
}

export interface TokenForm {
    id?: number
    fee: number
    name: string
    icon?: string
    address: string
    can_vote: boolean
    can_create_campaign: boolean
    status: string
}

export interface VoterType {
    avatar: string
    brief_introduction: string
    candidate_id: number
    comment: string
    name: string
    user: string
    votes: number
    voting_time: string
}

export interface tokenTypePayload {
    action: string
    id?: number
    fee: number
    name: string
    address: string
    icon?: string
    can_vote: number
    can_create_campaign: number
    status: number
}


