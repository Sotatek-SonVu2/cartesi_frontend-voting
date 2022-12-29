import { createNotifications } from 'common/Notification'
import { handleResponse } from 'helper/handleResponse'
import { getInspect } from 'helper/inspect'
import { sendInput } from 'helper/sendInput'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { convertPayload } from 'utils/common'
import {
	ERROR_MESSAGE,
	NOTI_TYPE,
	NO_RESPONSE_ERROR,
	WAITING_FOR_CONFIRMATION,
	WAITING_RESPONSE_FROM_SERVER_MESSAGE,
} from 'utils/contants'
import { MetadataType, resInput } from 'utils/interface'

const useRequest = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [callMessage, setCallMessage] = useState<string>('')
	const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false)
	const [candidateId, setCandidateId] = useState<number>(0)
	const [success, setSuccess] = useState<boolean>(false)
	const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)

	const fetchApi = async (params: any) => {
		try {
			setIsLoading(true)
			const payload = convertPayload(params, metadata)
			const response = await getInspect({ payload })
			if (!response.error) {
				setSuccess(true)
				return response
			} else {
				createNotifications(NOTI_TYPE.DANGER, response?.error || ERROR_MESSAGE)
			}
		} catch (error: any) {
			createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
			throw error
		} finally {
			setIsLoading(false)
		}
	}

	const fetchNotices = async (data: any, handleSuccess?: Function, handleError?: Function) => {
		try {
			setIsRequestLoading(true)
			setCallMessage(WAITING_FOR_CONFIRMATION)
			const { epoch_index, input_index }: resInput = await sendInput(data)
			handleResponse(epoch_index, input_index, (payload: any) => {
				if (!payload || (payload.message !== NO_RESPONSE_ERROR && !payload.error)) {
					const message = payload ? payload.message : WAITING_RESPONSE_FROM_SERVER_MESSAGE
					createNotifications(NOTI_TYPE.SUCCESS, message)
					setCallMessage('')
					setIsRequestLoading(false)
					if (typeof handleSuccess === 'function') {
						return handleSuccess(payload)
					}
				} else if (payload.message === NO_RESPONSE_ERROR) {
					setCallMessage(`Waiting: ${payload.times}s.`)
				} else {
					createNotifications(NOTI_TYPE.DANGER, payload?.error || ERROR_MESSAGE)
					setIsRequestLoading(false)
				}
			})
		} catch (error: any) {
			if (typeof handleError === 'function') {
				return handleError()
			}
			createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
			setIsRequestLoading(false)
			setCandidateId(0)
			setCallMessage('')
			throw error
		}
	}

	return {
		isLoading,
		success,
		callMessage,
		isRequestLoading,
		candidateId,
		setIsRequestLoading,
		setCandidateId,
		setCallMessage,
		fetchApi,
		fetchNotices,
	}
}

export default useRequest
