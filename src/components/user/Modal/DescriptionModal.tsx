import styled from "styled-components"
import ModalComponent from "common/Modal"
import NoData from "common/NoData"
import { ModalTitle } from "styled/common"
import { FormItem } from "styled/form"

const Content = styled.p`
    font-weight: 400;
    line-height: 1.5;
    font-size: 16px;
    height: 200px;
    text-align: justify;

    
`

type Props = {
    isVisible: boolean
    toggleModal: any
    data: any
}

const DescriptionModal = ({ isVisible, toggleModal, data }: Props) => {
    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} title={data.name || '(NO DATA)'}>
            <ModalTitle>
                <FormItem>
                    <b>Description: </b>
                    {data?.description || data?.brief_introduction ? (
                        <Content>{data.description || data?.brief_introduction}</Content>
                    ) : (
                        <NoData />
                    )}
                </FormItem>
            </ModalTitle>
        </ModalComponent>
    )
}

export default DescriptionModal