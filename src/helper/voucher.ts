import { ethers } from "ethers";
import { getVouchers } from "../graphql/vouchers";

interface Args {
    url?: string;
    epoch: number;
    input: number;
}

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || ''

export const getVoucher = async ({ url = GRAPHQL_URL, epoch, input }: Args) => {
    // wait for vouchers to appear in reader
    const vouchers = await getVouchers(url, {
        epoch_index: epoch,
        input_index: input,
    });

    // gathers outputs to print based on the retrieved vouchers
    // - sorts vouchers because the query is not sortable
    // - decodes the hex payload as an UTF-8 string, if possible
    // - prints only destination, payload and indices for epoch, input and voucher
    const outputs = vouchers
        .sort((a, b) => {
            // sort by epoch index and then by input index
            const epochResult = a.input.epoch.index - b.input.epoch.index;
            if (epochResult != 0) {
                return epochResult;
            } else {
                return a.input.index - b.input.index;
            }
        })
        .map((n) => {
            const output: any = {};
            output.id = n.id;
            output.epoch = n.input.epoch.index;
            output.input = n.input.index;
            output.voucher = n.index;
            output.destination = n.destination;
            try {
                output.payload = ethers.utils.toUtf8String(n.payload);
            } catch (e) {
                // cannot decode hex payload as a UTF-8 string
                output.payload = n.payload;
            }
            return output;
        });

    return JSON.stringify(outputs)
};