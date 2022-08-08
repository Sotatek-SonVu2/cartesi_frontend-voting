import { IInput } from "@cartesi/rollups"
import { ContractReceipt, ethers } from "ethers"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { NoticeKeys } from "../../generated-src/graphql"
import ModalComponent from "../common/Modal"
import { createNotifications } from "../common/Notification"
import { cartesiTokenContract, erc20Contract, inputContract } from "../helper/contractWithSigner"
import { onDepositUpdate } from "../reducers/authSlice"
import { AppDispatch } from "../store"
import { ModalTitle, SuccessButton } from "../styled/common"
import { ErrorText, Input } from "../styled/form"
import { ERROR_MESSAGE, NOTI_TYPE } from "../utils/contants"

type Props = {
    isVisible: boolean
    toggleModal: any
    onClick?: any
}

const DepositButton = styled(SuccessButton)`
    display: block;
    margin: 0 auto;
    padding: 10px 20px;
    margin-top: 30px;
`

const ErrorMessage = styled(ErrorText)`
    text-align: center;
`

const FormItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    & label {
        margin-right: 20px;
        font-size: 15px;
        font-weight: 400;
    }
`

const SPENDER_ADDRESS = process.env.REACT_APP_SPENDER_ADDRESS || "";
const CARTERSI_TOKEN_ADDRESS =
    process.env.REACT_APP_CARTERSI_TOKEN_ADDRESS || "";
const CHAIN_ID = process.env.REACT_APP_LOCAL_CHAIN_ID || ""

const ERROR_TEXT = 'Please enter amount'

export const findInputAddedInfo = (
    receipt: ContractReceipt,
    inputContract: IInput | any
): NoticeKeys => {
    if (receipt.events) {
        for (const event of receipt.events) {
            try {
                const parsedLog = inputContract.interface.parseLog(event);
                if (parsedLog.name == "InputAdded") {
                    return {
                        epoch_index: parsedLog.args.epochNumber.toString(),
                        input_index: parsedLog.args.inputIndex.toString(),
                    };
                }
            } catch (e) {
                // do nothing, just skip to try parsing the next event
            }
        }
    }
    throw new Error(
        `InputAdded event not found in receipt of transaction ${receipt.transactionHash}`
    );
};

const DepositModal = ({ isVisible, toggleModal }: Props) => {
    const { ethereum } = window;
    const dispatch = useDispatch<AppDispatch>()
    const addressWallet = useSelector((state: any) => state.auth.address)
    const [amount, setAmount] = useState({
        value: '',
        errorText: ''
    });

    const handleChange = (value: string) => {
        setAmount({
            value,
            errorText: !value ? ERROR_TEXT : ''
        })
    }

    const handleDeposit = async () => {
        const networkVersion = ethereum.networkVersion;
        if (networkVersion !== CHAIN_ID) {
            createNotifications(NOTI_TYPE.DANGER, `Current Chain ID does not match ${CHAIN_ID}`)
            return
        }
        if (!amount.value) {
            setAmount({
                ...amount,
                errorText: ERROR_TEXT
            })
            return
        }
        try {
            const allowance: any = await cartesiTokenContract().functions.allowance(addressWallet, SPENDER_ADDRESS);
            console.log('allowance', allowance)
            // increase erc20 allowance first if necessary
            const erc20Amount = ethers.BigNumber.from(parseInt(amount.value));

            if (allowance[0].lt(erc20Amount)) {
                const allowanceApproveAmount =
                    ethers.BigNumber.from(erc20Amount).sub(allowance[0]);
                console.log(
                    `approving allowance of ${allowanceApproveAmount} tokens...`
                );

                const tx = await cartesiTokenContract().approve(
                    SPENDER_ADDRESS,
                    allowanceApproveAmount
                );

                await tx.wait();

                if (tx.hash) {
                    console.log('Approve Token successfully!')
                }
            }

            // send deposit transaction
            console.log(`depositing ${amount.value} tokens...`);
            const tx = await erc20Contract().erc20Deposit(CARTERSI_TOKEN_ADDRESS, erc20Amount, "0x");
            console.log(`transaction: ${tx.hash}`);
            console.log("waiting for confirmation...");
            const receipt = await tx.wait();

            // find added input information from transaction receipt
            const inputAddedInfo = findInputAddedInfo(receipt, inputContract());
            console.log(
                `deposit successfully executed as input ${inputAddedInfo?.input_index} of epoch ${inputAddedInfo?.epoch_index}`
            );
            setAmount({
                value: '',
                errorText: ''
            })
            toggleModal()
            dispatch(onDepositUpdate())

            createNotifications(NOTI_TYPE.SUCCESS, 'Deposit successfully!')
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error.message || ERROR_MESSAGE)
            throw error
        }
    }


    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} title='Deposit'>
            <div>
                <ModalTitle>
                    <FormItem>
                        <label>Amount</label>
                        <Input
                            type="number"
                            name="amount"
                            value={amount.value}
                            placeholder="Enter amount.."
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                        />
                    </FormItem>
                </ModalTitle>
                <ErrorMessage>{amount.errorText}</ErrorMessage>
                <DepositButton onClick={handleDeposit}>Deposit</DepositButton>
            </div>
        </ModalComponent>
    )
}

export default DepositModal