import { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'лекция 1',
    songArtist: 'Е.С. Бхакти Викаша Свами',
    songSrc: './Assets/songs/Chasing - NEFFEX.mp3',
    songAvatar:
      'https://vasudeva.ru/images/thumbnails/images/stories/guru/bvks/Bhakti_Vikasa_Swami_z2-fill-1200x1200.jpg',
    stream: true,
  });

  //const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0);

  const currentAudio = useRef();

  //Change Avatar Class
  let avatarClass = ['objectFitCover', 'objectFitContain', 'none'];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };

  //Play Audio Function
  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const musicAPI = [
    {
      songName: 'Chasing',
      songArtist: 'NEFFEX',
      songSrc:
        'https://radiorecord.hostingradio.ru/rr_main96.aacp - NEFFEX.mp3',
      songAvatar: './Assets/Images/image1.jpg',
    },
  ];

  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  // const handlePrevSong = () => {
  //   if (musicIndex === 0) {
  //     let setNumber = musicAPI.length - 1;
  //     setMusicIndex(setNumber);
  //     updateCurrentMusicDetails(setNumber);
  //   } else {
  //     let setNumber = musicIndex - 1;
  //     setMusicIndex(setNumber);
  //     updateCurrentMusicDetails(setNumber);
  //   }
  // };

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
    });
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    //Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    setMusicTotalLength(musicTotalLength0);

    //Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${
      currentSec < 10 ? `0${currentSec}` : currentSec
    }`;
    setMusicCurrentTime(musicCurrentT);

    // const progress = parseInt(
    //   (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    // );
    // setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  const vidArray = ['./Assets/Videos/video1.mp4', './Assets/Videos/video2.mp4'];

  const handleChangeBackground = () => {
    if (videoIndex >= vidArray.length - 1) {
      setVideoIndex(0);
    } else {
      setVideoIndex(videoIndex + 1);
    }
  };

  const [isWebsiteDown, setIsWebsiteDown] = useState(false);

  useEffect(() => {
    async function checkWebsiteStatus() {
      try {
        const response = await fetch(
          'https://sravanradio.sattvalife.ru/stream'
        );
        if (response.status === 404) {
          setIsWebsiteDown(false);
        } else {
          setIsWebsiteDown(true);
        }
      } catch (error) {
        console.error('Error checking website status:', error);
        setIsWebsiteDown(true);
      }
    }

    checkWebsiteStatus();
  }, []);

  const record = isWebsiteDown && 'container';

  return (
    <>
      <div className="container">
        <audio
          src="https://sravanradio.sattvalife.ru/stream"
          ref={currentAudio}
          onEnded={handleNextSong}
          onTimeUpdate={handleAudioUpdate}
          id="myAudio"
        ></audio>
        <video
          src={vidArray[videoIndex]}
          loop
          muted
          autoPlay
          className="backgroundVideo"
        ></video>

        <div className="blackScreen"></div>
        <div className="music-Container">
          <p className="musicPlayer">Онлайн стрим</p>
          <a
            href="https://www.youtube.com/channel/UCY9z_LHm2NMRJbqKl2H3Kdw"
            title="Подпишись"
            className="youtube-Subs"
            target="_blank"
            rel="noreferrer"
          >
            <img src="./Assets/Images/Youtube_logo.png" alt="Youtube Logo" />
            <p>BVKS</p>
          </a>
          <p className="music-Head-Name">{currentMusicDetails.songName}</p>
          <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>

          <div id={record}>
            <img
              src={currentMusicDetails.songAvatar}
              className={avatarClass[avatarClassIndex]}
              onClick={handleAvatar}
              alt="song Avatar"
              id="songAvatar"
            />
            <div class="sphere"></div>
          </div>
          {!currentMusicDetails.stream && (
            <div className="musicTimerDiv">
              <p className="musicCurrentTime">${musicCurrentTime}</p>
              <p className="musicTotalLenght">${musicTotalLength}</p>
            </div>
          )}
          {/* <input
            type="range"
            name="musicProgressBar"
            className="musicProgressBar"
            value={audioProgress}
            onChange={handleMusicProgressBar}
          /> */}
          <div className="musicControlers">
            {/* <i
              className="fa-solid fa-backward musicControler"
              onClick={handlePrevSong}
            ></i> */}

            {isWebsiteDown ? (
              <i
                className={`fa-solid ${
                  isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'
                } playBtn`}
                onClick={handleAudioPlay}
              ></i>
            ) : (
              <i
                className={`fa-solid disabledPlay ${
                  isAudioPlaying ? 'fa-circle-play' : 'fa-pause-circle'
                } playBtn`}
              ></i>
            )}

            {/*     <i
              className="fa-solid fa-forward musicControler"
              onClick={handleNextSong}
            ></i> */}
          </div>
        </div>

        <div className="changeBackBtn" onClick={handleChangeBackground}>
          Сменить тему
        </div>
      </div>
    </>
  );
}

export default App;
