import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card';
import './ImageSwiper.css'
import axios from "axios";
import { useAuth } from '../store/AuthContext';
import FinalModal from './FinalModal';
import FinalLoader from './FinalLoader';

export default function ImageSwiper() {

  const { userToken, tokenableId } = useAuth();
  const dialog = useRef();

  const [images, setImages] = useState([]);
  const [left, setLeft] = useState('Left');
  const [right, setRight] = useState('Right');
  const upOrDown = 'Unsure';
  const [swipeData, setSwipeData] = useState({});
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/images')
      .then(response => {
        setImages(response.data.images);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });

    axios.get('http://127.0.0.1:8000/api/image-statuses')
      .then(response => {
        setLeft(response.data.imageStatuses[0]);
        setRight(response.data.imageStatuses[1]);
      })
      .catch(error => {
        console.error('Error fetching image-status:', error);
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

    // Update swipe data
    setSwipeData((prevSwipeData) => ({
      ...prevSwipeData,
      [nameToDelete]: direction === 'left' ? left : (direction === 'right' ? right : upOrDown),
    }));
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
    setCountdown(5)
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);

    // Update swipe data for undo
    setSwipeData((prevSwipeData) => ({
      ...prevSwipeData,
      [images[newIndex]]: null,
    }));

    childRefs[newIndex].current && (await childRefs[newIndex].current.restoreCard());
  };

  let swipeDataLength = Object.entries(swipeData).filter(([key, value]) => value !== null).length;

  useEffect(() => {
    let countdownInterval;


    if (swipeDataLength === images.length && images.length !== 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [swipeDataLength]);

  
  useEffect(() => {
    if(countdown === 0){
      // Make API call to send swipeData to your Laravel endpoint
      axios.post('http://127.0.0.1:8000/api/submit-swipe-data', {
        swipeData: swipeData,
        user_id: tokenableId
      })
        .then(response => {
          console.log('Swipe data submitted successfully:', response);
          // You may want to reset the countdown or perform other actions after successful submission
        })
        .catch(error => {
          console.error('Error submitting swipe data:', error);
          // Handle error accordingly
        });
      dialog.current.open();
    }
  }, [countdown, swipeData]);

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
        {swipeDataLength === images.length && (
          <>
            <FinalModal ref={dialog} />
            <p>Your answers will be submitted in</p>
            <span className="text-4xl font-bold mr-2">{countdown}</span>
            <FinalLoader />
          </>
        )}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>{left}</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>{right}</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          Marked as: {lastDirection === 'left' ? left : (lastDirection === 'right' ? right : upOrDown)}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
      <h2 className="text-2xl text-white mt-8 mb-4">Instructions</h2>
      <div className="text-center text-gray-700">
        <p>Swipe left for {left}</p>
        <p>Swipe right for {right}</p>
        <p>Swipe up or down if you are unsure</p>
      </div>
    </div>
  );
}