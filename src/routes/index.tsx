import Main from "../pages/Main"
import Login from "../pages/Login"
import { ROUTER_PATH } from "./contants"
import ListCampaign from "../components/ListCampaign"
import AddEditCampaign from "../components/AddEditCampaign"
import Voting from "../components/Voting"
import Result from "../components/Result"
import Description from "../components/Description"

interface RouterProps {
    path?: string
    component: JSX.Element
    children: any
    index?: boolean
}

export const routes: Array<RouterProps> = [
    {
        path: ROUTER_PATH.LOGIN,
        component: <Login />,
        children: []
    },
    {
        path: ROUTER_PATH.HOMEPAGE,
        component: <Main />,
        children: [
            {
                component: <ListCampaign />,
                index: true,
            },
            {
                path: ROUTER_PATH.ADD_CAMPAIGN,
                component: <AddEditCampaign />,
                index: false,
            },
            {
                path: ROUTER_PATH.EDIT_CAMPAIGN + '/:campaignId',
                component: <AddEditCampaign />,
                index: false,
            },
            {
                path: ROUTER_PATH.VOTING + '/:campaignId',
                component: <Voting />,
                index: false,
            },
            {
                path: ROUTER_PATH.RESULT + '/:campaignId',
                component: <Result />,
                index: false,
            },
            {
                path: ROUTER_PATH.DESCRIPTION + '/:campaignId',
                component: <Description />,
                index: false,
            },
            {
                path: ROUTER_PATH.DESCRIPTION + '/:campaignId' + '/:candidateId',
                component: <Description />,
                index: false,
            }
        ]
    },

]