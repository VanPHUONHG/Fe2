import { ReactNode, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

type Props = {
  children: ReactNode;
};

const PrivateRouter = ({ children }: Props) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("key");
  const isNotified = useRef(false); 

  useEffect(() => {
    if (!isLoggedIn && !isNotified.current) {
      isNotified.current = true;
      message.error("Bạn cần đăng nhập để tiếp tục");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <>{children}</> : null;
};

export default PrivateRouter;
