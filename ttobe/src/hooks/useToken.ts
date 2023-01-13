import { useEffect, useState } from "react";

//localStorage를 사용하려면 | null이 없으면 안됨 json이라서 그런가??
type account = string | null;
type grant = string | null;

const useToken = () => {
  const [grant, setGrant] = useState<grant>("");
  const [aToken, setAToken] = useState<account>("");

  useEffect(() => {
    setGrant(localStorage.getItem("grantType"));
    setAToken(localStorage.getItem("accessToken"));
  }, []);

  const Tokens = ['Bearer' + " " + aToken];
  // const fullToken = Tokens.join();

  return { Tokens };
};

export default useToken;

// todo: get 방식으로
