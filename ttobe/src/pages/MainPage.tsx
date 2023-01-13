// React 기본 기능 Import
import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
// Calendar Import
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
// Modal Component
import Modal from "../components/Modal";
// Style 적인 요소들 Import
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { TbArrowNarrowLeft, TbArrowNarrowRight } from "react-icons/tb";
import { CheckBox, LabelCheckedBox } from "../components/CheckBox.stroies";
import { useRouter } from "next/router";
import useToken from "../hooks/useToken";

// Input 태그와 Label 태그를 연결하기 위한 for 값 상수화
const INPUT_ID = "CheckBox";

export default function MainPage() {
  const {Tokens} = useToken();
  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const onClickDayTile = (e: React.MouseEvent<HTMLElement>) => {
    // e.preventDefault();
    alert("you clicked me");
  };

  // Modal 부분 .Modal.tsx < 2)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  // 목표 추가 페이지 이동
  const router = useRouter(); 

  const AddGoal = () => {
    router.push({
      pathname: "AddGoal",
    })
  }

  // 추후에 백 데이터를 받아올 부분 (리스트 선택 및 해제)
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const onChecked = () => {
    setIsChecked((prev: boolean) => !prev);
  };

  return (
    <>
      <StyledHeader>
        <Image
          src="/img/ttobeLogo.png"
          alt="blackrabbit"
          width={100}
          height={100}
        ></Image>
        {/* 사용자의 이메일 정보를 가져와야 함*/}
        <StyledUserEmail>Jaehun990909@gmail.com 님!</StyledUserEmail>
      </StyledHeader>
      {/* <div>
        <div></div>
        <div></div>
      </div> */}
      <StyledContainerDiv>
        <GlobalStyle />
        <StyledCalendarDiv className="app">
          <StyledH2 className="text-center">Calendar</StyledH2>
          <div className="calendar-container">
            <StyledCalendar
              formatDay={(locale, date) =>
                date.toLocaleString("en", { day: "numeric" })
              }
              locale="ko"
              prevLabel={<TbArrowNarrowLeft />}
              nextLabel={<TbArrowNarrowRight />}
              next2Label={null}
              prev2Label={null}
              onChange={setDate}
              minDetail="month"
              // onClickDay={onClickDayTile}
              // onClickDay={onClickButton}
              // Modal 함수 각 Date 클릭 시 마다 모달 생성인데,
              onClickDay={onClickToggleModal}
              value={date}
              showNeighboringMonth={false}
            />
            {/* isOpenModal이 참인 경우 오른쪽을 반환 즉, Modal 컴포넌트 콜백함수 부르기 */}
            {isOpenModal && (
              <Modal onClickToggleModal={onClickToggleModal}>
                <Image
                  src="/img/hare.png"
                  alt="달리는 토끼"
                  width={100}
                  height={100}
                ></Image>
                <StyledModalTitle>
                  {month}월 {day}일 목표 리스트
                </StyledModalTitle>
                <StyledPlusBtn onClick={AddGoal}>+</StyledPlusBtn>
                <StyledTextBallon>목표 추가 페이지로 이동하기</StyledTextBallon>
                {/* 이 부분은 CheckBox 백 데이터 받아와야되는 부분 */}
                <div>
                  <StyledCheckBoxContainer>
                    {/* <StyledCheckBox
                      type="checkbox"
                      id={INPUT_ID}
                      onChange={onChecked}
                    />
                    <StyledCheckLabel htmlFor={INPUT_ID} value={isChecked}>
                      라벨 내용
                    </StyledCheckLabel> */}
                    <CheckBox />
                    {/* <LabelCheckedBox /> */}
                  </StyledCheckBoxContainer>
                  <div>
                    <input type="checkbox" /> 요?
                  </div>
                  <div>
                    <input type="checkbox" /> 요?
                  </div>
                  <div>
                    <input type="checkbox" /> 요?
                  </div>
                </div>
              </Modal>
            )}
          </div>
          <StyledP className="text-center">
            <span className="bold">선택된 날짜: </span> {date.toDateString()}
          </StyledP>
        </StyledCalendarDiv>
        <StyledListDiv>
          <h2>My List</h2>
          {/* 리스트 정렬 백 데이터 받아와야 하는 부분 */}
          <div>
            <StyledList>
              <span>1. 미니 프로젝트 완성하기</span>
            </StyledList>
            <StyledList>
              <span>1. 미니 프로젝트 완성하기</span>
            </StyledList>
            <StyledList>
              <span>1. 미니 프로젝트 완성하기</span>
            </StyledList>
            <StyledList>
              <span>1. 미니 프로젝트 완성하기</span>
            </StyledList>
          </div>
        </StyledListDiv>
      </StyledContainerDiv>
    </>
  );
}

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-end;
`;

const StyledUserEmail = styled.h2`
  color: black;
  margin-left: 50px;
  opacity: 0.8;
  font-weight: 400;
`;

// - #82AAE3
// - #BFEAF5
// - #EAFDFC

// 화면 2분할
const StyledContainerDiv = styled.div`
  display: flex;
`;

// 캘린더 부분 화면의 66%정도 차지
const StyledCalendarDiv = styled.div`
  width: 66%;
`;

// 리스트 부분은 33%정도 차지
const StyledListDiv = styled.div`
  width: 34%;
`;

// 제목글자 시작
const StyledH2 = styled.h2`
  text-align: left;
`;

const StyledP = styled.p`
  text-align: center;
`;

//todo Calendar 컴포넌트 스타일링
const StyledCalendar = styled(Calendar)`
  position: relative;
  height: 100%;

  // React Calendar의 몸통 부분
  &.react-calendar {
    width: 1000px;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border: none;
    border-radius: 10px;
    box-shadow: 0 12px 24px rgba(202, 222, 225, 0.4);
    line-height: 1.125em;
  }

  // Calendar 년도, 월 선택 부분
  .react-calendar__navigation {
    display: flex;
    height: 50px;
    margin-bottom: 1.5em;

    & button {
      width: 300px;
      background: none;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-weight: lighter;
      transition: all 0.2s;
      color: #111111;
    }
    & button:hover {
      background: #cadde0;
      font-size: 16px;
      color: white;
      transition: all 0.5s;
      cursor: pointer;
    }
  }

  // 요일 밑줄 제거
  abbr[title] {
    text-decoration: none;
    color: #82aae3;
  }

  // 주말은 색다르게 표시
  .react-calendar__month-view__weekdays__weekday:nth-child(6) > abbr[title],
  .react-calendar__month-view__weekdays__weekday:nth-child(7) > abbr[title] {
    color: red;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 0.75em;
  }

  // calendar 날짜 선택 wrapper
  .react-calendar__viewContainer {
    padding-bottom: 20px;
  }

  // date tile 각각 설정
  .react-calendar__tile {
    max-width: 100%;
    padding: 30px;
    background: none;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
    &--now {
      background: #cadde0;
      &:enabled:hover,
      &:enabled:focus {
        background: #bfeaf5;
      }
    }
  }
`;

//todo 스타일링
const StyledList = styled.div`
  border: 1px solid black;
  border-radius: 25px;
  background-color: #eafdfc;
  padding: 12px;
  width: 50%;
  margin-bottom: 30px;
`;

//todo Modal Styling Part
const StyledModalTitle = styled.h1`
  font-size: 28px;
  font-weight: 500;
  font-style: italic;
`;

// + button
const StyledPlusBtn = styled.button`
  padding: 5px 10px;
  background-color: white;
  font-size: 24px;
  margin-top: 20px;
  border: 2px solid #bfeaf5;
  color: #bfeaf5;
  cursor: pointer;
  &:hover {
    transform: scale(1.3) rotate(180deg);
    background-color: #f3fcfb;
    border: 2px solid #9cf7f2;
    color: #9cf7f2;
    transition: all 0.6s;
  }
  &:hover + p {
    display: block;
    margin-top: 115px;
  }
`;

// + button hover시 애니메이션
const StyledTextBallon = styled.p`
  display: none;
  position: absolute;
  width: 150px;
  padding: 8px;
  left: 100;
  border-radius: 8px;
  background: #333;
  column-rule-color: #fff;
  font-size: 10px;
  color: #a9e6f5;
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border: solid transparent;
    border-color: rgba(50, 50, 50, 0);
    border-bottom: #333;
    border-width: 10px;
    pointer-events: none;
  }
`;
//!
//? CheckBox Css로 해보려다가 못함
const StyledCheckBox = styled.input`
  display: none;
  &:checked + label::before {
    content: "";
    width: 16px;
    height: 16px;
    background-color: #fc9595;
  }
`;

const StyledCheckLabel = styled.label`
  display: block;
  &::before {
    content: "";
    width: 16px;
    height: 16px;
    border: 1px solid gray;
  }
`;

// checkbox Container 부분
const StyledCheckBoxContainer = styled.div`
  margin-top: 20px;
`;
