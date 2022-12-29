import { hex2str } from '../utils/common'

interface Args {
	payload: string
	url?: string
}

const BASE_URL_API = process.env.REACT_APP_INSPECT_URL_API || ''

export const getInspect = async ({ payload, url = BASE_URL_API }: Args) => {
	const response = await fetch(`${url}/${payload}`)
	console.log(`Returned status: ${response.status}`)
	if (response.status === 200) {
		const result = await response.json()
		for (let i in result.reports) {
			let payload = result.reports[i].payload
			return JSON.parse(hex2str(payload))
		}
		if (result.exception_payload) {
			let payload = result.exception_payload
			return JSON.parse(hex2str(payload))
		}
	} else {
		console.log(JSON.stringify(await response.text()))
	}
}
