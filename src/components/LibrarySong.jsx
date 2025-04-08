const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying, setSongs, setLibraryStatus }) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);

    //Add active state
    const newSongs = songs.map(oneSong => {
      if (song === oneSong) {
        return {
          ...oneSong,
          active: true,
        };
      }
        return {
          ...oneSong,
          active: false,
        };
    });

    await setSongs(newSongs);

    if (isPlaying) {
      await audioRef.current.play();
    }
  };
  return (
    <div
      onClick={() => {
        songSelectHandler();
        setLibraryStatus(false);
      }}
      className={`library-song ${song.active ? 'selected' : ''}`}
      tabIndex={0}
      onKeyDown={e => {
        if (e.code !== 'Enter') return;
          songSelectHandler();
      }}
    >
      <img src={song.cover} alt={song.name} />
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
