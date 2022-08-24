import { Navigate, Route, Routes } from "react-router-dom";
import Background from "./common/Background";
import AddEditCampaign from "./components/AddEditCampaign";
import ListCampaign from "./components/ListCampaign";
import Result from "./components/Result";
import Voting from "./components/Voting";
import Withdraw from "./components/Withdraw";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { ROUTER_PATH } from "./routes/contants";
import PrivateOutlet from "./routes/PrivateOutlet";
import { MainWrapper } from "./styled/main";

function App() {
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
            <Route element={<ListCampaign />} index={true} />
            <Route element={<AddEditCampaign />} path={ROUTER_PATH.ADD_CAMPAIGN} />
            <Route element={<AddEditCampaign />} path={ROUTER_PATH.EDIT_CAMPAIGN + '/:campaignId'} />
            <Route element={<Voting />} path={ROUTER_PATH.VOTING + '/:campaignId'} />
            <Route element={<Result />} path={ROUTER_PATH.RESULT + '/:campaignId'} />
            <Route element={<Withdraw />} path={ROUTER_PATH.WITHDRAW} />
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
