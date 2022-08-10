import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTER_PATH } from "./contants";

interface PropsType {
  children: JSX.Element
}

const PrivateOutlet = ({ children }: PropsType) => {
  const addressWallet = useSelector((state: any) => state.auth.address)
  return addressWallet ? children : <Navigate to={ROUTER_PATH.LOGIN} />
}

export default PrivateOutlet