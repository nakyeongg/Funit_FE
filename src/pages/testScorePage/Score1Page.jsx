import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import icon from '../../assets/img/character/mint.png';
import axiosInstance from '../../apis/axiosInstance';


const Score1Page = () => {
    const { state } = useLocation();
    const [score, setScore] = useState(state?.score || null); // 네비게이트로 전달된 점수
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNicknameAndScore = async () => {
            try {
                const storedNickname = localStorage.getItem('username');
                setNickname(storedNickname || 'Unknown');

                if (score === null) {
                    const userId = localStorage.getItem('userId');
                    const response = await axiosInstance.post('/api/record/score', {
                        testedBy: 3,
                        createdBy: 104,
                    });
                    setScore(response.data);
                }
            } catch (error) {
                console.error('점수나 닉네임을 가져오는 중 오류 발생:', error.response || error);
                alert('데이터를 불러오는 데 실패했습니다.');
            }
        };

        fetchNicknameAndScore();
    }, [score]);
    const handleButtonClick = () => {
        navigate('/tree'); 
    };
    return (
        <div className='container score-container'>
            <h2>
                <span style={{ color: "#FF7F71" }}>{score}</span>점
            </h2>
            <h3>{nickname}님과 통하는 사이!</h3>
            <img src={icon} alt="10점" />
            <div className='alert'>
                <p>6점을 넘기면 친구에게 편지를 받을 수 있어요!</p>
                <Button title="받은 편지 확인하러 가기" onClick={handleButtonClick}/>
            </div>
        </div>
    );
};

export default Score1Page;
