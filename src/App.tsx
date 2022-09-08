import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Background from "./common/Background";
import { createNotifications } from "./common/Notification";
import AddEditCampaign from "./components/AddEditCampaign";
import History from "./components/History";
import ListCampaigns from "./components/ListCampaigns";
import Result from "./components/Result";
import Voting from "./components/Voting";
import Withdraw from "./components/Withdraw";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { ROUTER_PATH } from "./routes/contants";
import PrivateOutlet from "./routes/PrivateOutlet";
import { MainWrapper } from "./styled/main";
import { checkConnected } from "./utils/checkConnected";
import { ADDRESS_WALLET, CONNECT_METAMASK_ERROR_MESSAGE, NOTI_TYPE } from "./utils/contants";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkConnectedToMetamask = async () => {
      const connected = await checkConnected()
      if (!connected) {
        localStorage.setItem(ADDRESS_WALLET, '');
        navigate(ROUTER_PATH.LOGIN, { replace: true })
        createNotifications(NOTI_TYPE.DANGER, CONNECT_METAMASK_ERROR_MESSAGE)
      }
    }

    checkConnectedToMetamask()
  }, [])


  return (
    <MainWrapper>
      <Background>
        <Routes>
          <Route element={<Login />} path={ROUTER_PATH.LOGIN} />
          <Route
            element={
              <PrivateOutlet>
                <Main />
              </PrivateOutlet>
            }
            path={ROUTER_PATH.HOMEPAGE}
          >
            <Route element={<ListCampaigns />} index={true} />
            <Route element={<AddEditCampaign />} path={ROUTER_PATH.ADD_CAMPAIGN} />
            <Route element={<AddEditCampaign />} path={ROUTER_PATH.EDIT_CAMPAIGN + '/:campaignId'} />
            <Route element={<Voting />} path={ROUTER_PATH.VOTING + '/:campaignId'} />
            <Route element={<Result />} path={ROUTER_PATH.RESULT + '/:campaignId'} />
            <Route element={<Withdraw />} path={ROUTER_PATH.WITHDRAW} />
            <Route element={<History />} path={ROUTER_PATH.HISTORY} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={ROUTER_PATH.HOMEPAGE} replace />}
          />
        </Routes>
      </Background>
    </MainWrapper>

  );
}

export default App;
