import React from "react";
import appStyles from "../scss/app.module.scss";
import smile from "../assets/img/smille-2.gif";
import smilePNG from "../assets/img/smille-2.png";
import VideoPlayer from "../components/VideoPlayer";

const HeaderSection = () => {
  const myRef = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 690);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 690);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (myRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(myRef.current);
    }

    return () => {
      // Этот блок уже не требует повторного вызова handleResize
      // window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <section className={appStyles.section}>
      <VideoPlayer />
      {!isMobile ? (
        <>
          {/* Десктопная версия */}
          <div className={appStyles.Row}>
            <div className={appStyles.buttonRow}>
              <article>
                <div className={appStyles.button}>
                  <span>music videos</span>
                </div>
                <div className={appStyles.button}>
                  <span>commercials</span>
                </div>
                <div className={appStyles.button}>
                  <span>event videos</span>
                </div>
                <div className={appStyles.button}>
                  <span>product videos</span>
                </div>
                <div className={appStyles.button}>
                  <span>short films</span>
                </div>
              </article>
            </div>
          </div>
          <div className={appStyles.Row}>
            <div
              id="about us"
              className={
                isVisible === false
                  ? `${appStyles.smileRow}`
                  : `${appStyles.smileRow} ${appStyles.active}`
              }
              ref={myRef}
            >
              <div>
                <h1 className={appStyles.startWord}>AB</h1>
              </div>
              {startAnimation ? (
                <img
                  draggable="false"
                  src={smile}
                  alt="smile"
                  className={appStyles.smileGif}
                />
              ) : (
                <img
                  draggable="false"
                  src={smilePNG}
                  alt="smile"
                  className={appStyles.smileGif}
                />
              )}
              <div>
                <h1 className={appStyles.endWord}>UT US</h1>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Мобильная версия */}
          <div className={appStyles.Row}>
            <div
              id="about us"
              className={
                isVisible === false
                  ? `${appStyles.smileRow}`
                  : `${appStyles.smileRow} ${appStyles.active}`
              }
              ref={myRef}
            >
              <div>
                <h1 className={appStyles.startWord}>AB</h1>
              </div>
              {startAnimation ? (
                <img
                  draggable="false"
                  src={smile}
                  alt="smile"
                  className={appStyles.smileGif}
                />
              ) : (
                <img
                  draggable="false"
                  src={smilePNG}
                  alt="smile"
                  className={appStyles.smileGif}
                />
              )}
              <div>
                <h1 className={appStyles.endWord}>UT</h1>
              </div>
            </div>
            <div>
              <h1 className={appStyles.endWordMobile}>US</h1>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default HeaderSection;
