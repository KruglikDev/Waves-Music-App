import { memo } from "react";
import LibrarySong from "./LibrarySong.jsx";
import { v4 as uuidv4 } from "uuid";

const Library = ({
  songs,
  setCurrentSong,
  libraryStatus,
  audioRef,
  isPlaying,
  setSongs,
  setLibraryStatus,
}) => {
  return (
    <aside
      className={`library ${libraryStatus ? "active-library" : ""}`}
      onMouseLeave={() => setLibraryStatus(false)}
    >
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            isPlaying={isPlaying}
            audioRef={audioRef}
            setCurrentSong={setCurrentSong}
            song={song}
            key={uuidv4()}
            songs={songs}
            setSongs={setSongs}
            setLibraryStatus={setLibraryStatus}
          />
        ))}
      </div>
    </aside>
  );
};

export default memo(Library);
