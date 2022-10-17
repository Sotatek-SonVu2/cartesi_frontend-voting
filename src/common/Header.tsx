import { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DepositModal from "../components/Modal/DepositModal";
import LogoutIcon from "../images/logout.svg";
import Logo from '../images/Logo_Sotatek2.svg';
import WalletIcon from "../images/wallet-icon.png"
import { clearAccount } from "../reducers/authSlice";
import { ROUTER_PATH } from "../routes/contants";
import { AppDispatch, RootState } from "../store";
import { Address, Content, InforUser, Menu, MenuList, MenuTitle } from "../styled/header";
import { Tooltip } from "../styled/list";
import { formatAddress } from "../utils/common";
import NotificationList from "./NotificationList";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false)
    const authState = useSelector((state: RootState) => state.auth)
    const { address } = authState

    const handleLogout = async () => {
        dispatch(clearAccount())
        navigate(ROUTER_PATH.LOGIN, { replace: true })
    }

    useEffect(() => {
        if (!window.ethereum) return;

        window.ethereum.on("accountsChanged", handleLogout);
        window.ethereum.on("disconnect", handleLogout);
        window.ethereum.on("chainChanged", () => {
            window.location.reload();
        });
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

    const handleCopy = () => {
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 1000)
    }

    return (
        <Content>
            <img src={Logo} alt="logo" width={130} onClick={() => navigate(ROUTER_PATH.HOMEPAGE)} />
            <Menu>
                <InforUser>
                    <CopyToClipboard text={address} onCopy={handleCopy}>
                        <Address>
                            <Tooltip>
                                <img src={WalletIcon} alt="wallet-icon" width={18} style={{ marginRight: '3px', marginBottom: '3px' }} />
                                <span>{formatAddress(address)}</span>
                                <div className="tooltiptext">{!isCopied ? 'Copy to Clipboard' : 'Copied!'}</div>
                            </Tooltip>
                        </Address>
                    </CopyToClipboard>

                </InforUser>
                <MenuList>
                    <MenuTitle onClick={toggleModal}>
                        Deposit
                    </MenuTitle>
                    <MenuTitle onClick={() => navigate(ROUTER_PATH.WITHDRAW, { replace: true })}>
                        Withdraw
                    </MenuTitle>
                    <MenuTitle onClick={() => navigate(ROUTER_PATH.HISTORY, { replace: true })}>
                        History
                    </MenuTitle>
                </MenuList>
                <NotificationList />
                <img src={LogoutIcon} alt="logoutIcon" width={20} className="Icon" onClick={handleLogout} />
            </Menu>

            {isVisible && (
                <DepositModal
                    isVisible={isVisible}
                    toggleModal={toggleModal}
                />
            )}
        </Content>
    )
}

export default Header