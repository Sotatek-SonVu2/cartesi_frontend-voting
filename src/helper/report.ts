import { getReports } from '../graphql/reports'
import { hex2str } from '../utils/common'

interface Args {
	url?: string
	epoch?: number
	input?: number
}

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || ''

export const getReport = async ({ url = GRAPHQL_URL, epoch, input }: Args) => {
	// wait for reports to appear in reader
	const reports: any = await getReports(url, {
		epoch_index: epoch,
		input_index: input,
	})

	// gathers outputs to print based on the retrieved reports
	// - sorts reports because the query is not sortable
	// - decodes the hex payload as an UTF-8 string, if possible
	// - prints only payload and indices for epoch, input and report
	const outputs = reports
		.sort((a: any, b: any) => {
			// sort by epoch index and then by input index
			const epochResult = a.input.epoch.index - b.input.epoch.index
			if (epochResult !== 0) {
				return epochResult
			} else {
				return a.input.index - b.input.index
			}
		})
		.map((n: any) => {
			const output: any = {}
			output.id = n.id
			output.epoch = n.input.epoch.index
			output.input = n.input.index
			output.report = n.index
			output.payload = hex2str(n.payload)
			return output
		})

	return JSON.stringify(outputs)
}
