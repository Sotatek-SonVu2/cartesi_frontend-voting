import { createClient, defaultExchanges } from "@urql/core";
import { GetLastEpochInfoDocument } from "../generated-src/graphql";

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || ''

export const getLastEpoch = async () => {
    // create GraphQL client to reader server
    const client = createClient({ url: GRAPHQL_URL, exchanges: defaultExchanges, fetch });

    const { data, error } = await client
        .query(GetLastEpochInfoDocument)
        .toPromise();

    if (data?.epochs) {
        return data.epochs;
    } else {
        throw new Error(error?.message);
    }
};