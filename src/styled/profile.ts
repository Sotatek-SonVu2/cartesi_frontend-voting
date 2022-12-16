import styled from "styled-components";
import { DangerButton, PrimaryButton, SuccessButton } from "./common";
import { BoxItem, ContentBox } from "./list";

interface DetailItemStatusType {
    isStartTime: boolean
    isEndTime: boolean
}

export const ProfileInfo = styled.div`
    display: flex;
    align-items: center;

    & img {
        margin-right: 1rem;
        object-fit: cover;
        border-radius: 9999px;
    }

    & p {
        margin: 0;
        font-size: 15px;
    }
`

export const ItemContent = styled(ContentBox)`
    & .image {
        border-radius: 9999px;
        object-fit: cover;
  }
`

export const ProfileName = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: 600;
`

export const ProfileDesc = styled.div`
    margin: 20px 0;
`

export const ProfileBox = styled(BoxItem)`
    min-width: 188px;
    margin-right: 10px;
    margin-left: 10px;
`

export const DetailItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const DetailItemContent = styled.div`
    border-radius: 10px;
    border: 1px solid #242527;
    padding: 24px;
    cursor: pointer;
    background: rgb(25 6 6 / 50%);
    margin-bottom: 1rem;

    &:hover{
        border: 1px solid #e5e7eb;
    }
`

export const DetailItemStatus = styled.div<DetailItemStatusType>`
    background: linear-gradient(to right, #288BDB, #38B2FF, #69CEFF);
    font-size: 13px;
    height: 26px;
    vertical-align: middle;
    padding: 0 12px;
    border-radius: 16px;
    line-height: 26px;

    ${props => props.isStartTime && `background: linear-gradient(to right, #31AF25, #4CCC33, #80E062);`}
    ${props => props.isEndTime && `background: linear-gradient(to right, #DB2B2A, #FF4B3A, #FF846B);`}
`

export const AddButton = styled(SuccessButton)`
    padding: 0;
    font-size: 23px;
    width: 60px;
    border-radius: 15px;
`

export const JoinButton = styled(SuccessButton)`
    padding: 0;
    width: 120px;
    border-radius: 23px;
    height: 40px;
`

export const ProfileButton = styled(SuccessButton)`
    display: block;
    margin: 0 auto;
    padding: 7px 18px;
    margin-bottom: 20px;
    margin-top: 2rem;
    width: 75%;
    justify-content: center;
    border-radius: 23px;
`

export const EditButton = styled(PrimaryButton)`
    padding: 0;
    width: 70px;
    border-radius: 23px;
    height: 33px;
    font-size: 13px;
    margin-right: 10px;
`

export const DeleteButton = styled(DangerButton)`
    padding: 0;
    width: 70px;
    border-radius: 23px;
    height: 33px;
    font-size: 13px;
`

export const SubmitButton = styled(SuccessButton)`
    display: flex;
    align-items: center;
`