import React from "react";
import styled from "styled-components";
import { FiCheck } from "react-icons/fi";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string | null;
}

export default function Checkbox({
  id,
  checked,
  onChange,
  label,
}: CheckboxProps) {
  return (
    <StyledCheckboxContainer>
      <StyledCheckBox checked={checked} htmlFor={id}>
        <StyledHiddenCheckbox
          id={id}
          type="checkbox"
          onChange={onChange}
          checked={checked}
        />
        <FiCheck size="28" color="white" />
      </StyledCheckBox>
      <StyledCheckList>List 하나씩 올 예정</StyledCheckList>
      {/* {label ? <Label htmlFor={id}>{label}</Label> : null} */}
    </StyledCheckboxContainer>
  );
}

const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckBox = styled.label<{ checked: boolean }>`
  display: inline-block;
  width: 30px;
  height: 30px;
  /* border: 1px solid black; */
  background: ${({ checked }) => (checked ? `#BFEAF5` : `white`)};
  border: ${({ checked }) => (checked ? `none` : `1px dashed black`)};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
`;

const StyledHiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckList = styled.span`
  margin-left: 20px;
  font-size: 18px;
`;

//! 라벨 연결 개발 과정 일단 생략
// const Label = styled.label`
//   display: inline-block;
//   line-height: 16px;
//   padding-left: 10px;
//   cursor: pointer;
// `;
