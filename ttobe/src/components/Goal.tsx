import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Arrow from "./Arrow";
import Delete from "./Delete";
import styled from "styled-components";
import Image from "next/image";
import axios from "axios";
import useToken from "../hooks/useToken";

interface IGoal {
  // id : number;
  content: string;
}

const INPUT_ID = "goalinput";

export default function Goal() {
  const {fullToken} = useToken();
  const [goals, setGoals] = useState<IGoal[]>([]);
  const [currentGoal, setCurrentGoal] = useState<string>("");

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

    setGoals((prev) => [
      ...prev,
      { id: prev.length + 1, content: currentGoal },
    ]);
    setCurrentGoal("");

    axios
      .post("/main/habit", {
        goal: goals,
      },
      {
        headers: {
          Authorization: fullToken,
        }
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        router.push("/MainPage");
      })
      .catch((err) => {
        console.log(err);
        alert("문제가 발생했습니다.");
      });

  };

  const router = useRouter();

  const Main = () => {
    router.push({
      pathname: "/MainPage",
    });
  };

  return (
    <>
      <StyledContainer>
        {goals.map((goal) => (
          <StyledDiv key={goal.content}>
            <Arrow />
            <StyledSpan>{goal.content}</StyledSpan>
            <StyledDeleteBtn onClick={Main}>
              <Delete />
            </StyledDeleteBtn>
          </StyledDiv>
        ))}
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
        <StyledBackBtn>메인페이지로 이동</StyledBackBtn>
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
