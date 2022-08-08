import { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DepositModal from "../components/DepositModal";
import { sendInput } from "../helper/sendInput";
import logo from '../images/Cartesi_Logo_White.svg';
import EthIcon from "../images/ethereum-eth.svg";
import LogoutIcon from "../images/logout-icon.svg";
import { clearAccount } from "../reducers/authSlice";
import { ROUTER_PATH } from "../routes/contants";
import { AppDispatch } from "../store";
import { Address, Content, Currency, Deposit, DepositContent, InforUser } from "../styled/header";
import { Loader } from "../styled/loading";
import { formatAddress, handleNotices } from "../utils/common";
import { DEPOSIT_INFO, ERROR_MESSAGE, NOTI_TYPE } from "../utils/contants";
import { DepositInfoType, MetadataType } from "../utils/interface";
import { createNotifications } from "./Notification";


const Header = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [balance, setBalance] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const authState = useSelector((state: any) => state.auth)
    const { address, isDepositUpdate } = authState

    const handleLogout = async () => {
        dispatch(clearAccount())
        navigate(ROUTER_PATH.LOGIN, { replace: true })
    }

    useEffect(() => {
        const getDeposetInfo = async () => {
            try {
                setIsLoading(true)
                const data = {
                    action: DEPOSIT_INFO,
                }
                const noticeKeys = await sendInput(data);
                handleNotices(noticeKeys?.epoch_index, noticeKeys?.input_index, ((payload: DepositInfoType) => {
                    const amount = payload.amount - payload.used_amount
                    setBalance(amount)
                    setIsLoading(false)
                }))
            } catch (error: any) {
                createNotifications(NOTI_TYPE.DANGER, error.message || ERROR_MESSAGE)
                setIsLoading(false)
                throw error
            }
        }

        getDeposetInfo()
    }, [isDepositUpdate])

    useEffect(() => {
        if (!window.ethereum) return;

        window.ethereum.on("accountsChanged", handleLogout);
        // window.ethereum.on("chainChanged", handleLogout);
        window.ethereum.on("disconnect", handleLogout);

        return () => {
            if (window.ethereum.removeListener) {
                window.ethereum.removeListener("accountsChanged", handleLogout);
                window.ethereum.removeListener("chainChanged", handleLogout);
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
                            <span>{balance} CTSI</span>

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