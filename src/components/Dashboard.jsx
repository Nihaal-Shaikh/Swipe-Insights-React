import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card';
import './Dashboard.css'
import axios from "axios";

function Dashboard () {

    const [images, setImages] = useState([]);
  
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/images')
        .then(response => {
          setImages(response.data.images);
        })
        .catch(error => {
          console.error('Error fetching images:', error);
        });
    }, []);
    
  const [currentIndex, setCurrentIndex] = useState(images.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      images.map(() => React.createRef()),
    [images]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < images.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < images.length) {
      childRefs[currentIndex].current && (await childRefs[currentIndex].current.swipe(dir));
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    childRefs[newIndex].current && (await childRefs[newIndex].current.restoreCard());
  };

  return (
    <div>
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {images.map((imageUrl, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={imageUrl}
            onSwipe={(dir) => swiped(dir, imageUrl, index)}
            onCardLeftScreen={() => outOfFrame(imageUrl, index)}
          >
            <div
              style={{ backgroundImage: `url(${imageUrl})` }}
              className='card'
            >
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  )
}

export default Dashboard