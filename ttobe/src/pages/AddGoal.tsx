import Image from "next/image";
import styled from "styled-components";
import Goal from "../components/Goal";

export default function AddGoal() {
  return (
    <>
      <StyledImgWrapper>
        <Image src="/img/rabbit.png" alt="blackrabbit" width={80} height={80} />
        <h1>2023년도 목표</h1>
      </StyledImgWrapper>
      <StyledHr />

      <Goal/>
    </>
  );
}

const StyledImgWrapper = styled.div`
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const StyledHr = styled.hr`
  width: 50%;
  border-color: #82aae3;
`;
