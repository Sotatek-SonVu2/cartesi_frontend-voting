const defaultSteps = [
    {
        selector: '.user-info-step', // className
        content: 'This is your address wallet.', // content
    },
    {
        selector: '.deposit-step',
        content: "Let's press this button to deposit tokens into the DApp.",
    },
    {
        selector: '.withdraw-step',
        content: "Let's press this button to withdraw token to your wallet.",

    },
    {
        selector: '.history-step',
        content: "Let's press this button to view your activity history.",
    },
    {
        selector: '.notification-step',
        content: "Let's press this icon to view system notifications and your actions.",
    },
    {
        selector: '.logout-step',
        content: "Let's press this icon to logout of the DApp.",
    },
]

const campaignSteps = [
    {
        selector: '.campaign-item-step',
        content: 'This is the campaign for you to vote.',
    },
    {
        selector: '.datetime-step',
        content: 'This is campaign time for you to vote.',
    },
    {
        selector: '.highest-vote-step',
        content: 'This is your deposit information in the DApp.',
    },
    {
        selector: '.vote-number-step',
        content: 'The candidate with the highest number of votes.',
    },
    {
        selector: '.description-step',
        content: "Let's press this button to view the description of the campaign.",
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