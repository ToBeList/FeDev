/*
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

const useGetGoals = () => {
  const { Tokens } = useToken();
  const router = useRouter();
  const [post, setPost] = useState<IGoals[]>([]);
  //   const [post, setPost] = useState<IGoals | never>();

  const getPost = useCallback(() => {
    axios
      .get(`/main/habit`, {
        headers: {
          Authorization: Tokens,
        },
      })
      .then((data) => {
        console.log(data.data);
        setPost(data.data);
        console.log(JSON.stringify(data.data));
      })
      .catch((e) => {
        alert("no");
        if (Tokens === null) {
          router.push("/login");
          alert("로그인 후 이용");
        }
      });
  }, []);

  // getGoals 처음 렌더링, 값 변동 시 re
  useEffect(() => {
    getPost();
  }, [getPost]);

  return { post, getPost };
};

export default useGetGoals;
*/
