import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Arrow from "./Arrow";
import Delete from "./Delete";
import styled from "styled-components";
import Image from "next/image";
import axios from "axios";
import useToken from "../hooks/useToken";
import moment from "moment";
import "moment/locale/ko";
// import useGetGoals from "../hooks/useGetGoals";

// IGoals라는 인터페이스 선언
interface IGoals {
  id: string;
  goal: string;
  checked: boolean;
}

// IGoals를  goalList라는 IGoals 배열을 타입으로 갖는 IAims 인터페이스 선언
interface IAims {
  goalList: IGoals[];
}

const INPUT_ID = "goalinput";

// Goal 컴포넌트 선언, 함수형 컴포넌트로, 인자값을 IAims를 받아
// 그 안의 속성인 goalList를 비구조화 할당으로 꺼낸다.
// goalList는 배열이므로 map을 이용해 반복하여 goalItem 컴포넌트 렌더링
export default function Goal() {
  const { Tokens } = useToken();
  const [goals, setGoals] = useState<string>("");
  const [currentGoal, setCurrentGoal] = useState<string>("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentChecked, setCurrentChecked] = useState<boolean>(false);
  const router = useRouter();
  // 코드 추상화

  let ready = router.isReady;

  const [post, setPost] = useState<IAims>([]);
  // console.log(post);

  const onCurrentGoalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentGoal(value);
  };

  const onGoalSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentGoal === "") {
      alert("목표를 작성해주세요.");
      return;
    }
    axios
      .post(
        "/main/habit",
        {
          goal: currentGoal,
          date: moment(currentDate).format("YYYY-MM-DD"),
          checked: currentChecked,
        },
        {
          headers: {
            Authorization: Tokens,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        router.push("/AddGoal");
        alert("작성 완료");
      })
      .catch((err) => {
        console.log(err);
        alert("문제가 발생했습니다.");
      });

    setCurrentGoal("");
  };

  // get 방식 하려는 부분
  useEffect(() => {
    console.log(ready);
    const getPost = () => {
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
          // console.log(Tokens);
          // console.log(e);
        });
    };
    ready ? getPost() : null;
  }, []);

  const Main = () => {
    router.push({
      pathname: "/MainPage",
    });
  };

  return (
    <>
      <StyledContainer>
        <StyledForm onSubmit={onGoalSubmit}>
          <label htmlFor={INPUT_ID}>
            <Image src="/img/add.png" alt="add" width={35} height={35} />
          </label>
          <StyledInput
            id={INPUT_ID}
            onChange={onCurrentGoalChange}
            placeholder="목표 추가..."
            type="text"
            value={currentGoal}
          />
          <StyledBtn type="submit">
            <Image src="/img/write.png" alt="write" width={10} height={10} />
            {""} 작성
          </StyledBtn>
        </StyledForm>
        <div>hi
          {post?.goalList && post?.goalList.map((m) => {
            return <p key={m.id}>목표 리스트: {m.goal}</p>;
          })}
        </div>
        <StyledBackBtn onClick={Main}>메인페이지로 이동</StyledBackBtn>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSpan = styled.span`
  margin: 1.5rem 2rem;
  padding: 0.8em;
  border-radius: 10px;
  background-color: #bfeaf5;
`;

const StyledDeleteBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: white;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  margin: 1.5rem;
  padding: 0.7rem;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #ebebeb;
`;

const StyledBtn = styled.button`
  padding: 0.5rem;
  cursor: pointer;
  border: none;
  border-radius: 10px;

  &:hover,
  &:focus {
    background-color: #eafdfc;
    transition: all 0.5s;
    transform: translateY(-2px);
  }
`;

const StyledBackBtn = styled.button`
  margin: auto;
  cursor: pointer;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  background-color: #eafdfc;

  &:hover {
    background-color: #eafdfc;
    transition: all 0.5s;
    transform: translateY(-2px);
  }
`;
