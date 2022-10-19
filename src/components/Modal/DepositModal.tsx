import { IInput } from "@cartesi/rollups"
import { ContractReceipt, ethers } from "ethers"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import CoinsList from "../../common/CoinsList"
import ModalComponent from "../../common/Modal"
import { createNotifications } from "../../common/Notification"
import { tokenContract, erc20Contract, inputContract, configToken } from "../../helper/contractWithSigner"
import { getDepositInfo } from "../../reducers/authSlice"
import { AppDispatch, RootState } from "../../store"
import { colorTheme, ModalContent, ModalTitle, SuccessButton } from "../../styled/common"
import { ErrorText, Input } from "../../styled/form"
import { Loader } from "../../styled/loading"
import { CARTESI_TOKEN, NETWORK_ERROR_MESSAGE, NOTI_TYPE, WAITING_FOR_CONFIRMATION, WAITING_RESPONSE_FROM_SERVER_MESSAGE } from "../../utils/contants"
import { InputKeys } from "../../utils/types"
import { validateAmount } from "../../utils/validate"

type Props = {
    isVisible: boolean
    toggleModal: any
}

const DepositButton = styled(SuccessButton)`
    background-color: ${colorTheme.success};
    color: #ffffff;
    display: flex;
    margin: 0 auto;
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

export const findInputAddedInfo = (
    receipt: ContractReceipt,
    inputContract: IInput | any
): InputKeys => {
    if (receipt.events) {
        for (const event of receipt.events) {
            try {
                const parsedLog = inputContract.interface.parseLog(event);
                if (parsedLog.name === "InputAdded") {
                    return {
                        epoch_index: parsedLog.args.epochNumber.toNumber(),
                        input_index: parsedLog.args.inputIndex.toNumber(),
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
    const dispatch = useDispatch<AppDispatch>()
    const addressWallet = useSelector((state: RootState) => state.auth.address)
    const [tokenType, setTokenType] = useState<string>(CARTESI_TOKEN)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [callMessage, setCallMessage] = useState<string>('')
    const [amount, setAmount] = useState({
        value: '',
        errorText: ''
    });

    const handleChange = (value: string) => {
        setAmount({
            value,
            errorText: validateAmount(value)
        })
    }

    const handleDeposit = async () => {
        if (validateAmount(amount.value)) {
            setAmount({
                ...amount,
                errorText: validateAmount(amount.value)
            })
        } else {
            try {
                setIsLoading(true)
                // Check CTSI tokens in your account
                const getBalanceOf = await tokenContract(tokenType).balanceOf(addressWallet);
                const balanceOf = parseInt(ethers.utils.formatEther(getBalanceOf))
                if (balanceOf > 0 && balanceOf > parseInt(amount.value)) {
                    console.log("waiting for transaction...");
                    setCallMessage(WAITING_FOR_CONFIRMATION)
                    const allowance: any = await tokenContract(tokenType).functions.allowance(addressWallet, SPENDER_ADDRESS);
                    // increase erc20 allowance first if necessary
                    const erc20Amount = ethers.utils.parseEther(`${amount.value}`);
                    if (allowance[0].lt(erc20Amount)) {
                        const allowanceApproveAmount =
                            ethers.BigNumber.from(erc20Amount).sub(allowance[0]);
                        const tx = await tokenContract(tokenType).approve(
                            SPENDER_ADDRESS,
                            allowanceApproveAmount
                        );
                        await tx.wait();
                        if (tx.hash) {
                            console.log('Token approval successful!')
                        }
                    }

                    // send deposit transaction
                    const tokenAddress = configToken(tokenType) && configToken(tokenType)?.tokenAddress
                    if (!tokenAddress) {
                        return createNotifications(NOTI_TYPE.DANGER, NETWORK_ERROR_MESSAGE)
                    }
                    const tx = await erc20Contract().erc20Deposit(tokenAddress, erc20Amount, "0x");
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
                    dispatch(getDepositInfo())
                    createNotifications(NOTI_TYPE.SUCCESS, WAITING_RESPONSE_FROM_SERVER_MESSAGE)
                } else {
                    createNotifications(NOTI_TYPE.DANGER, 'Your account does not have enough CTSI tokens!')
                }
            } catch (error: any) {
                throw error
            } finally {
                toggleModal()
                setIsLoading(false)
            }
        }
    }

    const onChooseToken = (token: string) => {
        if (isLoading) return
        setTokenType(token)
    }


    return (
        <ModalComponent
            isVisible={isVisible}
            toggleModal={toggleModal}
            title='Deposit Token'
            isLoading={isLoading}
            width="500px"
        >
            <div>
                <ModalTitle>
                    <CoinsList onChooseCoin={onChooseToken} tokenType={tokenType} />
                </ModalTitle>
                <ModalContent>
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
                </ModalContent>
                <ErrorMessage>{amount.errorText || callMessage}</ErrorMessage>
                <DepositButton onClick={handleDeposit} disabled={isLoading}>
                    {isLoading && (<Loader />)}
                    Deposit
                </DepositButton>
            </div>
        </ModalComponent>
    )
}

export default DepositModal