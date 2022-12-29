import { AppDispatch, RootState, store } from 'store'

function useStore() {
	const dispatch: AppDispatch = (action: any) => {
		return store.dispatch(action)
	}

	const getState = <T>(slice: keyof RootState): T => {
		const state = store.getState()
		return state[slice] as unknown as T
	}

	return { dispatch, getState }
}

export default useStore
