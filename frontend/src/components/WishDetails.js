import React from 'react';
import  { useState } from 'react';
import { useWishesContext } from '../hooks/useWishesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Confetti from 'react-confetti';

const WishDetails = ({ wish,email }) => {
  const { dispatch } = useWishesContext()
  const { user } = useAuthContext()

  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });
  const [isMouseOver, setMouseOver] = useState(false);

  const handleMouseMove = (e) => {
    if (isMouseOver) {
      const rect = e.currentTarget.getBoundingClientRect();
      setConfettiPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleMouseEnter = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };
  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/wishes/' + wish._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WISH', payload: json })
    }
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };
  

  return (
    <div className="home">
      <div className="wish-details" onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {isMouseOver && (
          <Confetti
            numberOfPieces={50}
            gravity={0.2}
            wind={0.1}
            width={window.innerWidth}
            height={window.innerHeight}
            confettiSource={confettiPosition}
          />
        )}
        <h4>{wish.title}</h4>
        <p><strong>Text: </strong>{wish.text}</p>
        <p><strong>Date: </strong>{new Date(wish.date).toLocaleDateString('en-GB')}</p>
        <p><strong>Email: </strong>{wish.email}</p>
        <p><strong>Time: </strong>{formatTime(wish.time)}</p>
        <p>{formatDistanceToNow(new Date(wish.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
    </div>
  );
};

export default WishDetails