import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import axios from "axios";


export default function SignUp() {
  const router = useRouter();

  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const [repeatPw, setRepeatPw] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value);
  };

  const onChangeRePeatPw = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPw(e.target.value);
  };

  const onChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const errorAlert = () => {
    if (userPw != repeatPw) {
      return alert("비밀번호가 일치하지 않습니다.");
    } else {
    }
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/join", {
        username: userId,
        password: userPw,
        repeatedPassword: repeatPw,
        nickname: nickname,
      })
      .then((res) => {
        console.log(res.data);
        router.push("/signIn");
      })
      .catch((error) => {
        console.log(error);

        errorAlert();
      });
  };

  return (
    <>
      <StyledTitle>
        <Image src="/img/rabbit.png" alt="blackrabbit" width={80} height={80} />
        <StyledH2>회원가입</StyledH2>
      </StyledTitle>
      <StyledRegisterForm onSubmit={onSubmit}>
        <StyledDiv>
          <StyledLabel htmlFor="email">이메일</StyledLabel>
          <StyledInput
            type="email"
            id="email"
            onChange={onChangeId}
            placeholder="이메일"
            maxLength={40}
            required
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel htmlFor="username">유저명</StyledLabel>
          <StyledInput
            type="text"
            id="username"
            onChange={onChangeNickName}
            placeholder="2~8자"
            minLength={2}
            maxLength={8}
            required
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel htmlFor="pw">비밀번호</StyledLabel>
          <StyledInput
            type="password"
            id="pw"
            onChange={onChangePw}
            placeholder="최소 8자 입력"
            minLength={8}
            required
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel htmlFor="pwc">비밀번호 확인</StyledLabel>
          <StyledInput
            type="password"
            id="pwc"
            onChange={onChangeRePeatPw}
            placeholder="최소 8자 입력"
            minLength={8}
            required
          />
        </StyledDiv>

        <StyledBtnBox>
          <StyledBtn type="submit">회원가입</StyledBtn>
          {/* 백에 작성 내용 전달 */}
          <StyledBtn>돌아가기</StyledBtn>
        </StyledBtnBox>
      </StyledRegisterForm>
    </>
  );
}

const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledH2 = styled.h2`
  margin-top: 1.5rem;
`;

const StyledRegisterForm = styled.form`
  width: 50%;
  margin: auto;
  margin-top: 4rem;
  padding: 1rem;
  border: 3px solid #82aae3;
  border-radius: 10px;
  box-shadow: #82aae3 5px 5px, #bfeaf5 15px 15px, #eafdfc 25px 25px;
  /* box-shadow: #82aae3 0px 0px 0px 2px inset,
    rgb(255, 255, 255) 10px -10px 0px -3px, #bfeaf5 10px -10px,
    rgb(255, 255, 255) 20px -20px 0px -3px, #eafdfc 20px -20px,
    rgb(255, 255, 255) 30px -30px 0px -3px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledDiv = styled.div`
  margin: 10px 0;
  padding: 1rem;
`;

const StyledLabel = styled.label`
  margin-right: 1rem;
`;

const StyledInput = styled.input``;

const StyledBtnBox = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 1.5rem;
`;

const StyledBtn = styled.button`
  cursor: pointer;
  padding: 7px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #82aae3;

  &:hover {
    background-color: #a1bee7;
    transition: all 0.5s;
    transform: translateY(-2px);
  }
`;
