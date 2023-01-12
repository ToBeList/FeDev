import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const onBack = () => {
    router.push({
      pathname: "/",
    });
  };

  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkedPassword, setCheckedPassword] = useState<string>("");

  const onChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeCheckedPW = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckedPassword(e.target.value);
  };

  const errorAlert = () => {
    if (password != checkedPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/signup", {
        nickname: nickname,
        email: email,
        password: password,
        checkedPassword: checkedPassword,
      })
      .then((res) => {
        console.log(res.data);
        router.push("/");
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
          <StyledLabel htmlFor="nickname">닉네임</StyledLabel>
          <StyledInput
            type="text"
            id="nickname"
            onChange={onChangeNickName}
            placeholder="2~8자 이내"
            minLength={2}
            maxLength={8}
            required
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel htmlFor="email">이메일</StyledLabel>
          <StyledInput
            type="email"
            id="email"
            onChange={onChangeEmail}
            placeholder="example@domain.id"
            maxLength={40}
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
            onChange={onChangeCheckedPW}
            placeholder="최소 8자 입력"
            minLength={8}
            required
          />
        </StyledDiv>

        <StyledBtnBox>
          <StyledBtn type="submit">회원가입</StyledBtn>
          {/* 백에 작성 내용 전달 */}
          <StyledBtn onClick={onBack}>돌아가기</StyledBtn>
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
