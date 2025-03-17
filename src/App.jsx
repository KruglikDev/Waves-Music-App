import { useState, useRef, useEffect, lazy, Suspense } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Nav from "./components/Nav";
import Loader from "./components/Loader";
import data from "./data";

const Library = lazy(() => import("./components/Library"));

function App() {
  const audioRef = useRef(null);

  let root = document.documentElement;

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate Percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    root.style.setProperty("--mainTextColor", currentSong.color[1]);
  }, [currentSong, root.style]);

  return (
    <main className="App">
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Suspense className='loader' fallback={<Loader />}>
      <Song currentSong={currentSong} />
          <Player
            audioRef={audioRef}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setSongInfo={setSongInfo}
            songInfo={songInfo}
            songs={songs}
            setSongs={setSongs}
          />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      />
      <div
        className="vertical-button"
        onMouseEnter={() => setLibraryStatus(true)}
      />
      </Suspense>
    </main>
  );
}

export default App;
