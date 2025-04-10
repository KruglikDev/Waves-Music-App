import { memo, useState } from 'react';

const DarkBtn = () => {
  return (
    <>
      <input id={'dark_mode'} type='radio' name='radio_btns' className='visually-hidden' />
      <label htmlFor={'dark_mode'} className='content-wrapper'>
        <i className='material-icons-round'>light_mode</i>
      </label>
    </>
  );
};

const LiteBtn = () => {
  return (
    <>
      <input id={'light_mode'} type='radio' name='radio_btns' className='visually-hidden' />
      <label htmlFor={'light_mode'} className='content-wrapper'>
        <i className='material-icons-round'>dark_mode</i>
      </label>
    </>
  );
};

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  const [darkMode, setDarkMode] = useState(false);

  const colorModeChanger = () => {
    document.documentElement.classList.toggle('dark-mode');
    setDarkMode(!darkMode);
  };

  const LibraryStatusView = ({ libraryStatus }) => {
    return (
      <>
        <input
          id='library_music'
          type='radio'
          name='radio_btns'
          className='visually-hidden'
          onClick={() => setLibraryStatus(!libraryStatus)}
          checked={!!libraryStatus}
        />
        <label htmlFor='library_music' className='content-wrapper'>
          <i className='material-icons-round'>library_music</i>
        </label>
      </>
    );
  };

  const onKeyboardHandler = e => {
    if (e.code !== 'Enter') return;
    if (e.target.dataset.button === 'color_changer') {
      colorModeChanger();
    }
    if (e.target.dataset.button === 'lib_status_changer') {
      setLibraryStatus(!libraryStatus);
    }
  };

  return (
    <nav>
      <h1>Waves</h1>
      <div className='buttons'>
        <button
          type={'button'}
          data-button='color_changer'
          className='btn'
          onClick={colorModeChanger}
          tabIndex={0}
          onKeyDown={e => onKeyboardHandler(e)}
        >
          {darkMode ? <DarkBtn /> : <LiteBtn />}
        </button>
        <button
          type={'button'}
          data-button='lib_status_changer'
          className='btn'
          tabIndex={0}
          onKeyDown={e => onKeyboardHandler(e)}
        >
          <LibraryStatusView libraryStatus={libraryStatus} />
        </button>
      </div>
    </nav>
  );
};

export default memo(Nav);
