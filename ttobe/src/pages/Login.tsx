import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        router.push("/MainPage");
      })
      // Email/Pw 존재 X -> alert("잘못 입력")
      .catch((err) => {
        console.log(err);
        alert("아이디, 비밀번호가 틀리거나 존재하지 않는 계정입니다.")
      });
  };

  return (
    <>
      <StyledImgWrapper>
        <Image
          src="/img/rabbit.png"
          alt="blackrabbit"
          width={100}
          height={100}
        />
        <StyledH1>TToBe</StyledH1>
      </StyledImgWrapper>
      <StyledHr />
      <StyledContainer>
        <StyledDiv>
          <StyledImgBox>
            <Image
              src="/img/footprint.png"
              alt="footprint"
              width={300}
              height={300}
            />
          </StyledImgBox>
          <StyledTextBox>
            <h2>당신의 2023년 목표 설정,</h2>
            <p>여러분의 꿈을 이루세요!</p>
            <p>뚜비가 함께 합니다.</p>
          </StyledTextBox>
        </StyledDiv>
        <StyledLoginBox>
          <StyledContent>
            <StyledLoginDiv>Login</StyledLoginDiv>
            <form onSubmit={onSubmit}>
              <StyledInputWrapper>
                <StyledInput
                  type="email"
                  placeholder="이메일"
                  onChange={onChangeEmail}
                  maxLength={40}
                  required
                />
                <StyledInput
                  type="password"
                  placeholder="비밀번호"
                  onChange={onChangePw}
                  minLength={8}
                  required
                />
              </StyledInputWrapper>
              <StyledLoginBtn type="submit">로그인</StyledLoginBtn>
              {/* 메인페이지 이동 */}
            </form>
          </StyledContent>

          <StyledLink href="/Register">
            <StyledP>회원가입</StyledP>
          </StyledLink>
        </StyledLoginBox>
      </StyledContainer>
    </>
  );
}

const StyledImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledHr = styled.hr`
  margin: auto;
  width: 50%;
  border-color: #82aae3;
`;

const StyledContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  gap: 8rem;
`;

const StyledDiv = styled.div`
  position: relative;
`;

const StyledImgBox = styled.div`
  opacity: 0.2;
  position: relative;
  top: 0;
  left: 0;
  z-index: 0;
  transform: rotate(35deg);
`;

const StyledTextBox = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledH1 = styled.h1`
  margin-top: 0;
`;

const StyledLoginBox = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  border-radius: 20px;
  background-color: #ececec;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledLoginDiv = styled.div`
  font-size: large;
  font-weight: 900;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledInput = styled.input`
  padding: 0.7rem;
  border: none;
  border-radius: 10px;
`;

const StyledLoginBtn = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 5px;
  padding: 0.5rem;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background-color: #82aae3;
  color: white;
  font-weight: bold;

  &:hover {
    background-color: #a1bee7;
    transition: all 0.5s;
    transform: translateY(-2px);
  }
`;

const StyledP = styled.p`
  margin: 0;
  padding: 0.5rem;
  cursor: pointer;
  text-align: center;
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;
