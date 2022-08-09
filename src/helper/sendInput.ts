import { ContractReceipt, ethers } from "ethers";
import { JsonStringifyFormat } from "../utils/common";
import { NoticeKeys } from "../generated-src/graphql";
import { inputContract } from "./contractWithSigner";

export const findNoticeKeys = (receipt: ContractReceipt): NoticeKeys => {
    // get InputAddedEvent from transaction receipt
    const event = receipt.events?.find((e) => e.event === "InputAdded");

    if (!event) {
        throw new Error(
            `InputAdded event not found in receipt of transaction ${receipt.transactionHash}`
        );
    }

    const inputAdded = event as any;
    return {
        epoch_index: inputAdded.args.epochNumber.toString(),
        input_index: inputAdded.args.inputIndex.toString(),
    };
};

export const sendInput = async (data: any) => {
    try {
        const dataJson = JsonStringifyFormat(data)
        const inputBytes = ethers.utils.toUtf8Bytes(dataJson);
        const tx = await inputContract().addInput(inputBytes);
        console.log(`transaction: ${tx.hash}`);
        console.log("waiting for confirmation...");

        const receipt = await tx.wait(1);
        // find reference to notice from transaction receipt
        const noticeKeys: any = findNoticeKeys(receipt);
        return noticeKeys
    } catch (error) {
        throw error
    }
}