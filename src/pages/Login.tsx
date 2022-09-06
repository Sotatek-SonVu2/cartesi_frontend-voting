import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNotifications } from "../common/Notification";
import { web3Modal } from "../helper/provider";
import sotatekLogo from '../images/Logo_Sotatek2.svg';
import { setAccount } from "../reducers/authSlice";
import { ROUTER_PATH } from "../routes/contants";
import { AppDispatch } from "../store";
import { Container, LoginButton, Logo } from "../styled/login";
import { ERROR_MESSAGE, NOTI_TYPE } from "../utils/contants";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const instance = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(instance);
                const address = await provider.getSigner().getAddress();
                dispatch(setAccount(address))
                navigate(ROUTER_PATH.HOMEPAGE, { replace: true });
            } else {
                createNotifications(NOTI_TYPE.DANGER, 'Please install the MetaMask App!')
            }
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
            throw error
        }
    };


    return (
        <>
            <Logo>
                <img src={sotatekLogo} alt="sotatek logo" width={150} />
            </Logo>
            <Container>
                <h1>Welcome to <br />Voting Dapp</h1>
                <span>Powered by Cartesi</span>
                <p>This is the voting system that is used to use the blockchain OS of Cartesi. Users can vote for candidates listed in the system.
                    This system provides everyone the ability to create their own voting campaign.
                    (Only people deposited into the system can vote) They can create a campaign with a list of candidates within it.</p>

                <LoginButton onClick={connectWallet}>Let's start</LoginButton>
            </Container>
        </>
    );
}

export default Login