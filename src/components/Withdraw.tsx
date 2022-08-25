import { useEffect, useState } from "react"
import styled from "styled-components";
import Loading from "../common/Loading";
import { getVoucher as getVoucherExcute } from "../graphql/vouchers";
import { getVoucher as getVoucherList } from "../helper/voucher";
import PlusIcon from "../images/white-plus.png";
import { Content, Title } from "../styled/common";
import { BoxItem, WithdrawContent } from "../styled/list";
import { FlexLayout } from "../styled/main";
import WithdrawItem from "./Item/Withdraw";
import WithdrawModal from "./Modal/WithdrawModal";
import { OutputValidityProofStruct } from "@cartesi/rollups/dist/src/types/contracts/interfaces/IOutput";
import { outputContract } from "../helper/contractWithSigner";
import { ERROR_MESSAGE, NOTI_TYPE, WITHDRAW } from "../utils/contants";
import { createNotifications } from "../common/Notification";
import { handleResponse } from "../helper/handleResponse";
import { resInput } from "../utils/interface";
import { sendInput } from "../helper/sendInput";

const BoxItemCustom = styled(BoxItem)`
    display: flex;
    align-items: center;
`

const FlexLayoutSwap = styled(FlexLayout)`
    flex-wrap: wrap;
`
const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || ''

const Withdraw = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false)
    const [vouchers, setVouchers] = useState<any[]>([])
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    const getData = async () => {
        try {
            setIsLoading(true)
            const res = await getVoucherList({})
            const arr = JSON.parse(res)
            setVouchers(arr)
        } catch (error) {
            createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const onAddWithdraw = async (amount: string) => {
        try {
            setIsLoadingModal(true)
            const decimal = parseInt(amount) * Math.pow(10, 18)
            const data = {
                action: WITHDRAW,
                amount: decimal.toString()
            }
            const { epoch_index, input_index }: resInput = await sendInput(data);
            handleResponse(epoch_index, input_index, (async (payload: any) => {
                if (payload && !payload.error) {
                    createNotifications(NOTI_TYPE.SUCCESS, payload.message)
                    getData()
                } else {
                    createNotifications(NOTI_TYPE.DANGER, payload.error || ERROR_MESSAGE)
                }
                setIsLoadingModal(false)
                toggleModal()
            }))
        } catch (error) {
            createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
            setIsLoadingModal(false)
            toggleModal()
            throw error
        }

    }

    const onWithdraw = async (id: string) => {
        // wait for vouchers to appear in reader
        console.log(`retrieving voucher "${id}" along with proof`);
        const voucher = await getVoucherExcute(GRAPHQL_URL, id);
        if (!voucher.proof) {
            console.log(`voucher "${id}" has no associated proof yet`);
            return;
        }

        // send transaction to execute voucher
        console.log(`executing voucher "${id}"`);
        const proof: OutputValidityProofStruct = {
            ...voucher.proof,
            epochIndex: voucher.input.epoch.index,
            inputIndex: voucher.input.index,
            outputIndex: voucher.index,
        };
        try {
            // console.log(`Would check: ${JSON.stringify(proof)}`);
            const tx = await outputContract().executeVoucher(
                voucher.destination,
                voucher.payload,
                proof
            );
            const receipt = await tx.wait();
            console.log(`voucher executed! (tx="${tx.hash}")`);
            if (receipt.events) {
                console.log(`resulting events: ${JSON.stringify(receipt.events)}`);
            }
        } catch (e) {
            console.log(`COULD NOT EXECUTE VOUCHER: ${JSON.stringify(e)}`);
        }
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <Title>
                        Withdraw
                    </Title>
                    <FlexLayoutSwap>
                        <BoxItemCustom onClick={toggleModal}>
                            <WithdrawContent>
                                <img src={PlusIcon} alt="gift" width={'20%'} />
                                <h5>Add withdraw</h5>
                            </WithdrawContent>
                        </BoxItemCustom>
                        {vouchers?.map((item: any, index: number) => (
                            <BoxItem key={index}>
                                <WithdrawItem data={item} onClick={onWithdraw} />
                            </BoxItem>
                        ))}
                    </FlexLayoutSwap>
                    {isVisible && (
                        <WithdrawModal
                            isVisible={isVisible}
                            toggleModal={toggleModal}
                            isLoadingModal={isLoadingModal}
                            onAddWithdraw={onAddWithdraw}
                        />
                    )}
                </Content>
            )}
        </>
    )
}

export default Withdraw