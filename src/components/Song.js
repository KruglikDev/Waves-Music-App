const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      <div
        className="img-container"
        style={{ backgroundImage: `url(${currentSong.cover})` }}
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
