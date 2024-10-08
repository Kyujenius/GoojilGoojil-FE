import React, { useEffect, useState, useCallback } from "react";
import styles from "./roomListPage.module.css";
import copyIcon from "./copy.png";
import useRoom from "../../api/room/useRoom";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { roomsState } from "../../recoil/room-atoms";

const RoomListPage = () => {
  const { getRooms } = useRoom();
  const navigate = useNavigate();
  const rooms = useRecoilValue(roomsState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      await getRooms();
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("방 목록을 불러오는 데 실패했습니다.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [getRooms, navigate]);

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 의존성 배열

  const copyUrlToClipboard = (url) => {
    const fullUrl = `https://goojilgoojil.com/${url}/customize`;
    navigator.clipboard.writeText(fullUrl).then(
      () => alert("URL이 복사되었습니다!"),
      (err) => alert("URL 복사에 실패했습니다.")
    );
  };

  const handleEnterRoom = (roomId) => {
    localStorage.setItem("roomId", roomId);
    navigate("/speakerRoom");
    console.log("Entering room:", roomId);
  };

  const handleEnterSurvey = (roomId) => {
    localStorage.setItem("roomId", roomId);
    navigate("/survey");
    console.log("Entering Survey:", roomId);
  };

  const formatDate = (dateArray) => {
    const [year, month, day, hour, minute] = dateArray;
    return `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>구름톤 님의 강의실</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>방 이름</th>
            <th>강의명</th>
            <th>강의 날짜</th>
            <th>강의 장소</th>
            <th>URL (복사)</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.lectureName}</td>
              <td>{formatDate(room.date)}</td>
              <td>{room.location}</td>
              <td>
                <span className={styles.urlText}>{room.url}</span>
                <button
                  className={styles.copyButton}
                  onClick={() => copyUrlToClipboard(room.url)}
                >
                  <img src={copyIcon} alt="복사" className={styles.copyIcon} />
                </button>
              </td>
              <td>
                <button
                  className={styles.enterButton}
                  onClick={() => handleEnterRoom(room.id)}
                >
                  방 들어가기
                </button>
                <button
                  className={styles.enterButton}
                  onClick={() => handleEnterSurvey(room.id)}
                >
                  분석하러 가기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomListPage;
