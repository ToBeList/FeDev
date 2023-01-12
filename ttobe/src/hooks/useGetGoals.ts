import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import useToken from "./useToken";

interface IGoals {
  id: string;
  goal: string;
  date: string;
  checked: boolean;
}

interface IAims{
    data: IGoals[];
}
// interface IAims {
//   records: IGoals[];
// }

const useGetGoals = () => {
  const { Tokens } = useToken();
  const router = useRouter();
  let ready = router.isReady;
  const [post, setPost] = useState<IGoals[] | never>();
//   const [post, setPost] = useState<IGoals | never>();

  console.log(ready);
  
  const getGoals = useCallback(async () => {
    await axios
      .get(`/main/habit`, {
        headers: {
          Authorization: Tokens,
        },
      })
      .then((data) => {
        // console.log(res.data);
        setPost(data.data);
      })
      .catch((e) => {
        alert("No");
        if (Tokens === null) {
          router.push("/login");
          alert("로그인을 해주십시오");
        }
      });
  },[router, Tokens]);
  ready ? getGoals() : null;

  // getGoals 처음 렌더링, 값 변동 시 re
  useEffect(() => {
    getGoals();
  }, [getGoals]);

  return { post, getGoals };
};

export default useGetGoals;