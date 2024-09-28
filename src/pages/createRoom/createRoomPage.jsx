// CreateRoom.js
import React, { useState } from "react";
import styles from "./createRoomPage.module.css"; // 스타일을 위한 CSS 모듈
import { BUTTON_LABELS } from "../../constants/introContent"; // 버튼 라벨 import

import RoomComponent from "../../components/room/roomComponent"; // RoomComponent 모달 import

const CreateRoom = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 관리
  const [roomUrl, setRoomUrl] = useState(""); // 방 URL 상태 관리

  function handleCreateButton() {
    // 방 생성 로직 추가
    console.log("방 생성 버튼 클릭됨.");
    const generatedUrl = "https://example.com/react-study"; // 생성된 URL
    setRoomUrl(generatedUrl); // URL 상태 업데이트
    setModalOpen(true); // 모달 열기
  }

  return (
    <div className={styles.formContainer}>
      {/* 방 이름 */}
      <div className={styles.inputGroup}>
        <label htmlFor="roomName">1. 방 이름</label>
        <input
          type="text"
          id="roomName"
          placeholder="url을 입력해주세요..."
          className={styles.inputBox}
        />
        <div className={styles.requiredText}>*필수 질문입니다</div>
      </div>

      {/* 강의 이름 */}
      <div className={styles.inputGroup}>
        <label htmlFor="lectureName">2. 강의 이름</label>
        <input
          type="text"
          id="lectureName"
          placeholder="진행할 강의명을 입력해주세요..."
          className={styles.inputBox}
        />
      </div>

      {/* 강의 날짜 */}
      <div className={styles.inputGroup}>
        <label htmlFor="lectureDate">3. 강의 날짜</label>
        <input type="date" id="lectureDate" className={styles.inputBox} />
      </div>

      {/* 강의 장소 */}
      <div className={styles.inputGroup}>
        <label htmlFor="lecturePlace">4. 강의 장소</label>
        <input
          type="text"
          id="lecturePlace"
          placeholder="강의가 진행되는 장소명을 입력해주세요..."
          className={styles.inputBox}
        />
      </div>

      {/* 방 만들기 버튼 추가 */}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleCreateButton}>
          {BUTTON_LABELS.CREATE_ROOM}
        </button>
      </div>

      {/* RoomComponent 모달 */}
      {modalOpen && (
        <RoomComponent
          isOpen={modalOpen} // 모달 열림 상태
          onClose={() => setModalOpen(false)} // 모달 닫기 함수 전달
          url={roomUrl} // 생성된 URL 전달
        />
      )}
    </div>
  );
};

export default CreateRoom;
