import { Navigate, Route, Routes } from "react-router-dom";
import Background from "./common/Background";
import AddEditCampaign from "./components/user/AddEditCampaign";
import CampaignsList from "./components/user/CampaignsList";
import History from "./components//user/History";
import Result from "./components//user/Result";
import Voting from "./components/user/Voting";
import Withdraw from "./components/user/Withdraw";
import useAuth from "./hook/useAuth";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { ROUTER_PATH } from "./routes/contants";
import { MainWrapper } from "./styled/main";
import Tokens from "components/user/Tokens";


function App() {
  useAuth() //check connected with metamask
  return (
    <MainWrapper>
      <Background>
        <Routes>
          <Route element={<Login />} path={ROUTER_PATH.LOGIN} />
          <Route element={<Admin />} path={ROUTER_PATH.ADMIN} />
          <Route
            element={<Main />}
            path={ROUTER_PATH.HOMEPAGE}
          >
            <Route element={<CampaignsList />} index={true} />
            <Route element={<AddEditCampaign />} path={ROUTER_PATH.ADD_CAMPAIGN} />
            <Route element={<AddEditCampaign />} path={ROUTER_PATH.EDIT_CAMPAIGN + '/:campaignId'} />
            <Route element={<Voting />} path={ROUTER_PATH.VOTING + '/:campaignId'} />
            <Route element={<Result />} path={ROUTER_PATH.RESULT + '/:campaignId'} />
            <Route element={<Withdraw />} path={ROUTER_PATH.WITHDRAW} />
            <Route element={<History />} path={ROUTER_PATH.HISTORY} />
            <Route element={<Tokens />} path={ROUTER_PATH.TOKENS} />
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
