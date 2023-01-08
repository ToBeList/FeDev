import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const Login = () => {
    router.push({
      pathname: "/",
    });
  };

  return (
    <>
      <StyledTitle>
        <Image src="/img/rabbit.png" alt="blackrabbit" width={80} height={80} />
        <StyledH2>회원가입</StyledH2>
      </StyledTitle>
      <StyledRegisterForm>
        <StyledDiv>
          <StyledSpan>이메일</StyledSpan>
          <StyledInput type="email" placeholder="이메일" />
        </StyledDiv>
        <StyledDiv>
          <StyledSpan>닉네임</StyledSpan>
          <StyledInput type="text" placeholder="닉네임" />
        </StyledDiv>
        <StyledDiv>
          <StyledSpan>비밀번호</StyledSpan>
          <StyledInput type="password" placeholder="비밀번호" />
        </StyledDiv>
        <StyledDiv>
          <StyledSpan>비밀번호 확인</StyledSpan>
          <StyledInput type="password" placeholder="비밀번호 확인" />
        </StyledDiv>

        <StyledBtnBox>
          <StyledBtn>회원가입</StyledBtn>
          <StyledBtn onClick={Login}>돌아가기</StyledBtn>
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

const StyledRegisterForm = styled.div`
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

const StyledSpan = styled.span`
  margin-right: 2rem;
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
