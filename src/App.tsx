import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { routes } from './routes';
import { ROUTER_PATH } from "./routes/contants";

function App() {
  const navigate = useNavigate()
  const addressWallet = useSelector((state: any) => state.auth.address)

  useEffect(() => {
    if (!addressWallet) {
      navigate(ROUTER_PATH.LOGIN, { replace: true })
    }
  }, [addressWallet])

  return (
    <Routes>
      {routes.map(({ path, component, children }) => (
        <Route key={path} path={path} element={component}>
          {children?.map((child: any, index: number) => {
            return <Route key={index} path={child?.path} index={child?.index} element={child.component} />
          })}
        </Route>
      ))}
      <Route
        path="*"
        element={<Navigate to={ROUTER_PATH.HOMEPAGE} replace />}
      />
    </Routes>
  );
}

export default App;
