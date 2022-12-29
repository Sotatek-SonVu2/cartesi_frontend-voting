import { InputAddedEvent } from '@cartesi/rollups/dist/src/types/contracts/interfaces/IInput'
import { ContractReceipt, ethers } from 'ethers'
import { JsonStringifyFormat } from '../utils/common'
import { InputKeys } from '../utils/types'
import { inputContract } from './contractWithSigner'

export const getInputKeys = (receipt: ContractReceipt): InputKeys => {
	// get InputAddedEvent from transaction receipt
	const event = receipt.events?.find((e) => e.event === 'InputAdded')

	if (!event) {
		throw new Error(
			`InputAdded event not found in receipt of transaction ${receipt.transactionHash}`
		)
	}

	const inputAdded = event as InputAddedEvent
	return {
		epoch_index: inputAdded.args.epochNumber.toNumber(),
		input_index: inputAdded.args.inputIndex.toNumber(),
	}
}

export const sendInput = async (data: any) => {
	try {
		const payload = JsonStringifyFormat(data)

		// convert string to input bytes
		const inputBytes = ethers.utils.toUtf8Bytes(payload)

		// send transaction
		const tx = await inputContract().addInput(inputBytes)
		console.log(`transaction: ${tx.hash}`)
		console.log('waiting for confirmation...')
		const receipt = await tx.wait(1)
		// find reference to notice from transaction receipt
		const inputKeys = getInputKeys(receipt)
		console.log(`input ${inputKeys.input_index} added to epoch ${inputKeys.epoch_index}`)
		return {
			epoch_index: inputKeys.epoch_index,
			input_index: inputKeys.input_index,
		}
	} catch (error) {
		throw error
	}
}
