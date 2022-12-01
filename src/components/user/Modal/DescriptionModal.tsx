import styled from "styled-components"
import ModalComponent from "common/Modal"
import NoData from "common/NoData"
import { ModalTitle } from "styled/common"
import { FormItem } from "styled/form"
import MDEditor from "@uiw/react-md-editor"

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
                    {data?.description || data?.brief_introduction ? (
                        <Content>
                            <MDEditor.Markdown source={data.description || data?.brief_introduction} />
                        </Content>
                    ) : (
                        <NoData />
                    )}
                </FormItem>
            </ModalTitle>
        </ModalComponent>
    )
}

export default DescriptionModal