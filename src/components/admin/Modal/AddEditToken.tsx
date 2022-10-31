import ModalComponent from "common/Modal"
import styled from "styled-components"
import { colorTheme, ModalContent, SuccessButton } from "styled/common"
import { FormItem, Input } from "styled/form"
import { Loader } from "styled/loading"

interface PropsType {
    isVisible: boolean
    toggleModal: any
    isLoading: boolean
}

const SubmitButton = styled(SuccessButton)`
    background-color: ${colorTheme.success};
    color: #ffffff;
    padding: 5px 10px;
    float: right;
    margin-bottom: 1rem;
`

const AddEditToken = ({ isVisible, toggleModal, isLoading }: PropsType) => {
    return (
        <ModalComponent
            isVisible={isVisible}
            toggleModal={toggleModal}
            title='Create new token'
            isLoading={isLoading}
            width="500px"
            userGuideType='depositModal'
        >
            <div>
                {/* <ModalTitle>

                </ModalTitle> */}
                <ModalContent>
                    <FormItem>
                        <label>Amount</label>
                        <Input
                            type="number"
                            name="amount"
                            // value={amount.value}
                            placeholder="Enter amount.."
                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                        />
                    </FormItem>
                </ModalContent>
                {/* <ErrorMessage>{amount.errorText || callMessage}</ErrorMessage> */}
                <SubmitButton disabled={isLoading}>
                    {isLoading && (<Loader />)}
                    Submit
                </SubmitButton>
            </div>
        </ModalComponent>
    )
}

export default AddEditToken