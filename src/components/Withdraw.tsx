import { OutputValidityProofStruct } from "@cartesi/rollups/dist/src/types/contracts/interfaces/IOutput";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading from "../common/Loading";
import { createNotifications } from "../common/Notification";
import { getLastEpoch } from "../graphql/getLastEpoch";
import { getVoucher as getVoucherExcute } from "../graphql/vouchers";
import { outputContract } from "../helper/contractWithSigner";
import { handleInspectApi } from "../helper/handleInspectApi";
import { handleResponse } from "../helper/handleResponse";
import { sendInput } from "../helper/sendInput";
import { getVoucher as getVoucherList } from "../helper/voucher";
import PlusIcon from "../images/white-plus.png";
import { getDepositInfo } from "../reducers/authSlice";
import { AppDispatch, RootState } from "../store";
import { Content, Title } from "../styled/common";
import { BoxItem, Radio, RadioGroup, WithdrawContent, HeaderList } from "../styled/list";
import { FlexLayout } from "../styled/main";
import {
    ERROR_MESSAGE,
    LIST_EXECUTED_VOUCHER,
    NOTI_TYPE,
    NO_RESPONSE_ERROR,
    WAITING_RESPONSE_FROM_SERVER_MESSAGE,
    SAVE_EXECUTED_VOUCHER,
    WAITING_FOR_CONFIRMATION,
    WITHDRAW,
    WITHDRAW_RADIO_FILTER,
    WITHDRAW_RADIO_FILTER_STATUS
} from "../utils/contants";
import { MetadataType, resInput, WithDrawType } from "../utils/interface";
import WithdrawItem from "./Item/Withdraw";
import WithdrawModal from "./Modal/WithdrawModal";

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
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const [callMessage, setCallMessage] = useState<string>('')
    const [isWithdrawLoading, setIsWithdrawLoading] = useState<boolean>(false)
    const [vouchers, setVouchers] = useState<WithDrawType[]>([])
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<string>(WITHDRAW_RADIO_FILTER_STATUS.ALL)
    const dispatch = useDispatch<AppDispatch>()

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    const onChangeRadio = (e: any) => {
        setIsChecked(e.target.value)
    }

    const getFilterList = (vouchersList: WithDrawType[], executedId: string[]) => {
        let list
        switch (isChecked) {
            case WITHDRAW_RADIO_FILTER_STATUS.CLAIMED:
                list = vouchersList.filter(val => executedId.includes(val.id));
                break;
            case WITHDRAW_RADIO_FILTER_STATUS.NOT_CLAIM:
                list = vouchersList.filter(val => !executedId.includes(val.id));
                break;
            default:
                list = vouchersList
        }
        return list
    }

    const getData = async () => {
        try {
            setIsLoading(true)
            const data = {
                action: LIST_EXECUTED_VOUCHER
            }
            const { ids } = await handleInspectApi(data, metadata) //get list executed voucher
            const res = await getVoucherList({}) //get list voucher
            const lastEpoch = await getLastEpoch()
            const arr = JSON.parse(res)
            let result: any[] = []
            arr.forEach((item: WithDrawType) => {
                let obj
                const decode = new ethers.utils.AbiCoder().decode(["address", "uint256"], `0x${item.payload.slice(10)}`)
                const amount = parseInt(ethers.utils.formatEther(decode[1]))
                const isAllowExecute = item.epoch < lastEpoch.nodes[0].index || lastEpoch.nodes[0].vouchers.nodes[0].proof ? true : false
                if (ids.length > 0) {
                    ids.every((id: string) => {
                        obj = {
                            ...item,
                            amount,
                            isAllowExecute,  // The voucher is allowed to be executed
                            isExecuted: item.id === id, // The voucher has been executed
                        }
                        return item.id !== id
                    })
                } else {
                    obj = {
                        ...item,
                        amount,
                        isAllowExecute,  // The voucher is allowed to be executed
                        isExecuted: false, // The voucher has been executed
                    }
                }
                result.unshift(obj)
            })
            const filterList = getFilterList(result, ids)
            setVouchers(filterList)
        } catch (error) {
            createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [isChecked])

    const onAddWithdraw = async (amount: string) => {
        try {
            setIsWithdrawLoading(true)
            const decimal = parseInt(amount) * Math.pow(10, 18)
            const data = {
                action: WITHDRAW,
                amount: BigInt(decimal).toString()
            }
            setCallMessage(WAITING_FOR_CONFIRMATION)
            const { epoch_index, input_index }: resInput = await sendInput(data);
            handleResponse(epoch_index, input_index, (async (payload: any) => {
                if (!payload && payload.message !== NO_RESPONSE_ERROR && !payload.error) {
                    const message = payload ? payload.message : WAITING_RESPONSE_FROM_SERVER_MESSAGE
                    createNotifications(NOTI_TYPE.SUCCESS, message)
                    setIsWithdrawLoading(false)
                    getData()
                } else if (payload.message === NO_RESPONSE_ERROR) {
                    setCallMessage(`Waiting: ${payload.times}s.`)
                } else {
                    createNotifications(NOTI_TYPE.DANGER, payload?.error || ERROR_MESSAGE)
                    setIsWithdrawLoading(false)
                }
            }))
        } catch (error) {
            createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
            setIsWithdrawLoading(false)
            throw error
        } finally {
            dispatch(getDepositInfo())
        }
    }

    const onWithdraw = async (id: string, amount: number) => {
        // wait for vouchers to appear in reader
        setIsWithdrawLoading(true)
        setCallMessage(WAITING_FOR_CONFIRMATION)
        console.log(`retrieving voucher "${id}" along with proof`);
        const voucher = await getVoucherExcute(GRAPHQL_URL, id);
        if (!voucher.proof) {
            createNotifications(NOTI_TYPE.DANGER, `Voucher "${id}" has no associated proof yet`)
            return;
        }
        // send transaction to execute voucher
        const proof: OutputValidityProofStruct = {
            ...voucher.proof,
            epochIndex: voucher.input.epoch.index,
            inputIndex: voucher.input.index,
            outputIndex: voucher.index,
        };
        try {
            const tx = await outputContract().executeVoucher(
                voucher.destination,
                voucher.payload,
                proof
            );
            const receipt = await tx.wait();
            if (receipt.events) {
                const data = {
                    id,
                    amount,
                    action: SAVE_EXECUTED_VOUCHER
                }
                await sendInput(data)
                await dispatch(getDepositInfo())
                createNotifications(NOTI_TYPE.SUCCESS, 'Withdraw token successfully!')
            }
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
        } finally {
            getData()
            setIsWithdrawLoading(false)
        }
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <HeaderList>
                        <Title>
                            Withdraw
                        </Title>
                        <RadioGroup>
                            {WITHDRAW_RADIO_FILTER.map(({ value, label }, index: number) => (
                                <Radio key={index}>
                                    <input type="radio" id={`radio_${index}`} checked={isChecked === value} name={label} value={value} onChange={onChangeRadio} />
                                    {label}
                                </Radio>
                            ))}
                        </RadioGroup>
                    </HeaderList>

                    <FlexLayoutSwap>
                        <BoxItemCustom onClick={toggleModal}>
                            <WithdrawContent>
                                <img src={PlusIcon} alt="gift" width='20%' />
                                <h5>Withdraw token</h5>
                            </WithdrawContent>
                        </BoxItemCustom>
                        {vouchers.map((item: any, index: number) => (
                            <BoxItem key={index}>
                                <WithdrawItem data={item} onClick={onWithdraw} />
                            </BoxItem>
                        ))}
                    </FlexLayoutSwap>
                    {isWithdrawLoading && (
                        <Loading isScreenLoading={isWithdrawLoading} messages={callMessage} />
                    )}
                    {isVisible && (
                        <WithdrawModal
                            isVisible={isVisible}
                            toggleModal={toggleModal}
                            onAddWithdraw={onAddWithdraw}
                        />
                    )}
                </Content>
            )}
        </>
    )
}

export default Withdraw