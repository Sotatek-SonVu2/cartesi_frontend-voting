import ModalComponent from "common/Modal"
import NoToken from "common/NoToken"
import TokensList from "common/TokensList"
import useTokensList from "hook/useTokensList"
import confirmIcon from 'images/exclamation_icon.svg'
import { useState } from "react"
import { ButtonModal, ModalContent, ModalTitle } from "styled/common"
import { GET_ACTIVE_HAS_TOKEN, NO_TOKEN } from "utils/contants"

type Props = {
    isVisible: boolean
    toggleModal: any
    onClick: (tokenType: string) => void
}

const AddCampaignModal = ({ isVisible, toggleModal, onClick }: Props) => {
    const { tokenList, isLoading } = useTokensList(GET_ACTIVE_HAS_TOKEN)
    const [token, setToken] = useState<string>(tokenList[0]?.name)

    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal}>
            {tokenList?.length > 0 ? (
                <div>
                    <ModalTitle>
                        <img src={confirmIcon} className="title-icon" alt="confirm-Icon" width={30} />
                        <p>Are you sure to create this candidate?</p>
                    </ModalTitle>
                    <ModalContent>
                        <p className="modal-text-sm">The DApp will take 10 tokens from your wallet to perform this operation!</p>
                        <TokensList
                            onChooseCoin={(value: string) => setToken(value)}
                            tokenType={token}
                            isLoading={isLoading}
                            tokenList={tokenList}
                        />
                    </ModalContent>
                    <ButtonModal onClick={() => onClick(token)} disabled={isLoading || tokenList.length === 0} success>Create</ButtonModal>
                </div>
            ) : (
                <NoToken type={NO_TOKEN} />
            )}

        </ModalComponent>
    )
}

export default AddCampaignModal