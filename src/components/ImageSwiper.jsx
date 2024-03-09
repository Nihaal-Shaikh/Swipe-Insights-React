import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card';
import './ImageSwiper.css'
import axios from "axios";
import { useAuth } from '../store/AuthContext';
import FinalModal from './FinalModal';

export default function ImageSwiper() {

  const { userToken, tokenableId } = useAuth();
  const dialog = useRef();

  console.log(tokenableId);

  const [images, setImages] = useState([]);
  const [left, setLeft] = useState('Left');
  const [right, setRight] = useState('Right');
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
      [nameToDelete]: direction === 'left' ? left : right,
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

    if (swipeDataLength === 5) {
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
      console.log(swipeData)
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
        {swipeDataLength === 5 &&
          <>
            <FinalModal ref={dialog} />
            <p>Your answers will be submitted in</p>
            <span className="text-4xl font-bold mr-2">{countdown}</span>
            <div role="status">
              <svg aria-hidden="true" class="inline w-50 h-50 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>
          </>
        }
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>{left}</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>{right}</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          Marked as: {lastDirection === 'left' ? left : right}
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