import { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DepositModal from "../components/Modal/DepositModal";
import logo from '../images/Cartesi_Logo_White.svg';
import EthIcon from "../images/cartesi_icon.png";
import LogoutIcon from "../images/logout-icon.svg";
import { clearAccount, getDepositInfo } from "../reducers/authSlice";
import { ROUTER_PATH } from "../routes/contants";
import { AppDispatch } from "../store";
import { Address, Content, Currency, Deposit, DepositContent, InforUser } from "../styled/header";
import { Loader } from "../styled/loading";
import { formatAddress } from "../utils/common";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const authState = useSelector((state: any) => state.auth)
    const { address, deposit_info, isLoading } = authState
    const { amount, used_amount } = deposit_info
    const { ethereum } = window.ethereum

    useEffect(() => {
        dispatch(getDepositInfo())
    }, [])

    const handleLogout = async () => {
        dispatch(clearAccount())
        navigate(ROUTER_PATH.LOGIN, { replace: true })
    }

    useEffect(() => {
        if (!ethereum) return;

        ethereum.on("accountsChanged", handleLogout);
        ethereum.on("disconnect", handleLogout);
        ethereum.on("chainChanged", () => {
            window.location.reload();
        });
        return () => {
            if (ethereum.removeListener) {
                ethereum.removeListener("accountsChanged", handleLogout);
                // window.ethereum.removeListener("chainChanged", handleLogout);
                ethereum.removeListener("disconnect", handleLogout);
            }
        };
    }, [ethereum]);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    return (
        <>
            <Content>
                <img src={logo} alt="logo" width={110} onClick={() => navigate(ROUTER_PATH.HOMEPAGE)} />
                <InforUser>
                    <div style={{ marginRight: '20px' }}>
                        <CopyToClipboard text={address}>
                            <Address>
                                <span>{formatAddress(address)}</span>
                            </Address>
                        </CopyToClipboard>
                        <Currency>
                            {isLoading && (<Loader />)}
                            <img src={EthIcon} alt="ethIcon" width={15} />
                            <span>{amount} CTSI [used: {used_amount}]</span>
                        </Currency>
                    </div>
                    <Deposit onClick={toggleModal}>
                        <DepositContent>
                            Deposit
                        </DepositContent>
                    </Deposit>
                    <img className="logoutIcon" src={LogoutIcon} alt="logoutIcon" width={20} onClick={handleLogout} />
                </InforUser>

                {isVisible && (
                    <DepositModal
                        isVisible={isVisible}
                        toggleModal={toggleModal}
                    />
                )}
            </Content>
        </>
    )
}

export default Header