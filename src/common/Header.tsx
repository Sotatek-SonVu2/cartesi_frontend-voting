import { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DepositModal from "../components/DepositModal";
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
    let navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const authState = useSelector((state: any) => state.auth)
    const { address, deposit_amount, isLoading } = authState

    const handleLogout = async () => {
        dispatch(clearAccount())
        navigate(ROUTER_PATH.LOGIN, { replace: true })
    }

    useEffect(() => {
        dispatch(getDepositInfo())
    }, [])

    useEffect(() => {
        if (!window.ethereum) return;

        window.ethereum.on("accountsChanged", handleLogout);
        window.ethereum.on("disconnect", handleLogout);
        // window.ethereum.on("chainChanged", () => {
        //     window.location.reload();
        // });
        return () => {
            if (window.ethereum.removeListener) {
                window.ethereum.removeListener("accountsChanged", handleLogout);
                // window.ethereum.removeListener("chainChanged", handleLogout);
                window.ethereum.removeListener("disconnect", handleLogout);
            }
        };
    }, [window.ethereum]);

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
                            <span>{deposit_amount} CTSI</span>

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