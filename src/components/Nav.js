import { memo } from "react";

const Nav = ({ libraryStatus, setLibraryStatus, darkMode, setDarkMode }) => {
  const colorModeChanger = () => {
    document.documentElement.classList.toggle("dark-mode");
    setDarkMode(!darkMode);
  };

  const ColorModeView = ({ darkMode }) => {
    return (
      <>
        <input
          id={darkMode ? "light_mode" : "dark_mode"}
          type="radio"
          name="radio_btns"
          className="visually-hidden"
        />
        <label
          htmlFor={darkMode ? "light_mode" : "dark_mode"}
          className="content-wrapper"
        >
          {darkMode ? (
            <i className="material-icons-round">light_mode</i>
          ) : (
            <i className="material-icons-round">dark_mode</i>
          )}
        </label>
      </>
    );
  };

  const LibraryStatusView = ({ libraryStatus }) => {
    return (
      <>
        <input
          id="library_music"
          type="radio"
          name="radio_btns"
          className="visually-hidden"
          onChange={() => setLibraryStatus(!libraryStatus)}
          value={libraryStatus ? true : false}
        />
        <label htmlFor="library_music" className="content-wrapper">
          <i className="material-icons-round">library_music</i>
        </label>
      </>
    );
  };

  const onKeyboardHandler = (e) => {
    if (e.code !== "Enter") return;
    if (e.target.dataset.button === "color_changer") {
      colorModeChanger();
    }
    if (e.target.dataset.button === "lib_status_changer") {
      setLibraryStatus(!libraryStatus);
    }
  };

  return (
    <nav>
      <h1>Waves</h1>
      <div className="buttons">
        <div
          data-button="color_changer"
          className="btn"
          onClick={colorModeChanger}
          tabIndex={0}
          onKeyDown={(e) => onKeyboardHandler(e)}
        >
          <ColorModeView darkMode={darkMode} />
        </div>
        <div
          data-button="lib_status_changer"
          className="btn"
          onClick={() => setLibraryStatus(!libraryStatus)}
          tabIndex={0}
          onKeyDown={(e) => onKeyboardHandler(e)}
        >
          <LibraryStatusView libraryStatus={libraryStatus} />
        </div>
      </div>
    </nav>
  );
};

export default memo(Nav);
