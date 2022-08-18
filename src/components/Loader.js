const Loader = () => {
    return (
    <div className="preloader-wrapper">
        <div className="preloader">
            <div className="preloader__square" />
            <div className="preloader__square" />
            <div className="preloader__square" />
            <div className="preloader__square" />
        </div>
        <div className="status">
            Loadings
            <span className="status__dot">.</span>
            <span className="status__dot">.</span>
            <span className="status__dot">.</span>
        </div>
    </div>
    )
}

export default Loader;