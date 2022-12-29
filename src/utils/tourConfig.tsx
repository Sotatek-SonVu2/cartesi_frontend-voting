const defaultSteps = [
	{
		selector: '.user-info-step', // className
		content: 'This is your address wallet.', // content
	},
	{
		selector: '.deposit-step',
		content: 'Press this button to deposit tokens into the DApp.',
	},
	{
		selector: '.withdraw-step',
		content: 'Press this button to withdraw token to your wallet.',
	},
	{
		selector: '.history-step',
		content: 'Press this button to view your activity history.',
	},
	{
		selector: '.tokens-step',
		content: 'Press this button to view the list of tokens that the system supports.',
	},
	{
		selector: '.notification-step',
		content: 'Press this icon to view system notifications and your actions.',
	},
	{
		selector: '.logout-step',
		content: 'Press this icon to logout of the DApp.',
	},
	{
		selector: '.deposit-info-step',
		content: 'This is your deposit information in the DApp.',
	},
]

const campaignSteps = [
	{
		selector: '.campaign-item-step',
		content: 'This is the campaign for you to vote.',
	},
	{
		selector: '.datetime-step',
		content: 'This is the start time and end time of this campaign.',
	},
	{
		selector: '.highest-vote-step',
		content: 'The candidate with the highest number of vote.',
	},
	{
		selector: '.vote-number-step',
		content: 'Total votes of this campaign.',
	},
	{
		selector: '.description-step',
		content: 'Press this button to view the description of the campaign.',
	},
]

export const tourConfig = () => {
	let result = [...defaultSteps]
	const campaignItem = document.getElementsByClassName('campaign-item-step')
	if (campaignItem.length > 0) {
		result = result.concat(campaignSteps)
	}
	return result
}
