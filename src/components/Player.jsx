import { useCallback, useEffect } from "react";

const Player = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  currentSong,
  setCurrentSong,
  setSongs,
}) => {
  const activeLibraryHandler = useCallback(
    (nextPrev) => {
      const newSongs = songs.map((oneSong) => {
        if (oneSong === nextPrev) {
          return {
            ...oneSong,
            active: true,
          };
        } else {
          return {
            ...oneSong,
            active: false,
          };
        }
      });
      if (isPlaying) {
        setTimeout(function () {
          audioRef.current.play();
        }, 1000);
      }
      setSongs(newSongs);
    },
    [audioRef, isPlaying, setSongs, songs]
  );

  //Event Handlers
  const playSongHandler = useCallback(() => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [audioRef, isPlaying, setIsPlaying]);

  useEffect(() => {
    const onPlayByKeyboard = (e) => {
      if (e.code === "Space") {
        playSongHandler();
      }
    };

    window.addEventListener("keydown", onPlayByKeyboard);
    return () => {
      window.removeEventListener("keydown", onPlayByKeyboard);
    };
  }, [isPlaying, playSongHandler]);

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = useCallback(
    async (direction) => {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

      if (direction === "skip-forward") {
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
      }

      if (direction === "skip-back") {
        if (currentIndex === 0) {
          await setCurrentSong(songs[songs.length - 1]);
          activeLibraryHandler(songs[songs.length - 1]);
        } else {
          await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
          activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
      }
    },
    [activeLibraryHandler, currentSong.id, setCurrentSong, songs]
  );
  //Add the styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const onKeyboardHandler = useCallback(
    (e) => {
      if (e.code !== "Enter") return;
      switch (e.target.dataset.button) {
        case "skip_previous":
          skipTrackHandler("skip-back");
          break;

        case "play":
          playSongHandler();
          break;

        case "skip_next":
          skipTrackHandler("skip-forward");
          break;

        default:
          console.log("No keyboard match!");
      }
    },
    [playSongHandler, skipTrackHandler]
  );

  const View = useCallback(() => {
    return (
      <div className="play-control">
        <div
          data-button="skip_previous"
          className="btn"
          onClick={() => skipTrackHandler("skip-back")}
          tabIndex={0}
          onKeyDown={(e) => onKeyboardHandler(e)}
        >
          <input
            id="skip_previous"
            type="radio"
            name="radio_btns"
            className="visually-hidden"
          />
          <label htmlFor="skip_previous" className="content-wrapper">
            <i className="material-icons-round">skip_previous</i>
          </label>
        </div>

        <div
          className="btn"
          onClick={playSongHandler}
          tabIndex={0}
          onKeyDown={(e) => onKeyboardHandler(e)}
          data-button="play"
        >
          <input
            id={isPlaying ? "play" : "pause"}
            type="radio"
            onChange={playSongHandler}
            name="radio_btns"
            className="visually-hidden"
            checked={isPlaying ? true : false}
            value={isPlaying}
          />
          <label
            htmlFor={isPlaying ? "play" : "pause"}
            className="content-wrapper"
          >
            {isPlaying ? (
              <i className="material-icons-round">pause</i>
            ) : (
              <i className="material-icons-round">play_arrow</i>
            )}
          </label>
        </div>

        <div
          className="btn"
          onClick={() => skipTrackHandler("skip-forward")}
          onKeyDown={(e) => onKeyboardHandler(e)}
          tabIndex={0}
          data-button="skip_next"
        >
          <input
            id="skip_next"
            type="radio"
            name="radio_btns"
            className="visually-hidden"
          />
          <label htmlFor="skip_next" className="content-wrapper">
            <i className="material-icons-round">skip_next</i>
          </label>
        </div>
      </div>
    );
  }, [isPlaying, playSongHandler, skipTrackHandler, onKeyboardHandler]);

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <View />
    </div>
  );
};

export default Player;
