import styled from "styled-components"
import ModalComponent from "../../common/Modal"
import { PrimaryButton, ModalTitle } from "../../styled/common"
import { Loader } from "../../styled/loading"
import { ErrorText, Input } from "../../styled/form"
import { useState } from "react"
import { getVoucher } from "../../graphql/vouchers"
import { OutputValidityProofStruct } from "@cartesi/rollups/dist/src/types/contracts/interfaces/IOutput";
import { outputContract } from "../../helper/contractWithSigner"

const Button = styled(PrimaryButton)`
    display: flex;
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

type Props = {
    isVisible: boolean
    toggleModal: any
}

const ERROR_TEXT = 'Please enter amount'
const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || ''

const WithdrawModal = ({ isVisible, toggleModal }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
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

    const onWithdraw = async () => {
        // wait for vouchers to appear in reader
        const id = '1'
        console.log(`retrieving voucher "${id}" along with proof`);
        const voucher = await getVoucher(GRAPHQL_URL, id);
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
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} title='Withdraw Token' isLoading={isLoading}>
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
                <Button onClick={onWithdraw} disabled={isLoading}>
                    {isLoading && (<Loader />)}
                    Save
                </Button>
            </div>
        </ModalComponent>
    )
}

export default WithdrawModal