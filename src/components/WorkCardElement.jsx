import React, { useEffect, useState } from "react";
import appStyles from "../scss/app.module.scss";
import timing from "../assets/img/timing.gif";
import workHead from "../assets/img/workHead.gif";
import squary from "../assets/img/squar.png";
import moreArrow from "../assets/img/moreArrow.png";
import { Link } from "react-router-dom";

const WorkCardElement = () => {
  const images = [timing, workHead, workHead, timing, timing];
  const [isAnimating, setIsAnimating] = useState(images.map(() => false));
  const [isHovered, setIsHovered] = useState(null);

  const animationTimeouts = React.useRef();
  const animationTimeouts2 = React.useRef();

  const animate = (indices, state) => {
    if (state) {
      setIsAnimating((prevAnimating) => {
        const newAnimating = [...prevAnimating];
        indices.forEach((index) => {
          newAnimating[index] = !newAnimating[index];
        });
        return newAnimating;
      });
    } else {
      setIsAnimating((prevAnimating) => {
        const newAnimating = [...prevAnimating];
        indices.forEach((index) => {
          newAnimating[index] = false;
        });
        return newAnimating;
      });
    }
  };

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  useEffect(() => {
    if (isHovered !== null) {
      clearInterval(animationTimeouts.current);
      clearTimeout(animationTimeouts2.current);
      animate([0, 1, 2, 3, 4], false);
      setIsAnimating((prevAnimating) =>
        prevAnimating.map((_, index) => index === isHovered)
      );
    } else {
      setIsAnimating((prevAnimating) =>
        prevAnimating.map((_, index) => index === isHovered)
      );
      animationTimeouts.current = setInterval(() => {
        animate([0, 3, 4], true);
        animationTimeouts2.current = setTimeout(() => {
          animate([1, 2], true);
        }, 3000);
      }, 3000);
    }
  }, [isHovered]);

  return (
    <div className={appStyles.workBlock}>
      {images.map((photo, id) => (
        <Link to={`/project/${id}`} key={id}>
          <div
            className={appStyles.workCard}
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              draggable="false"
              src={images[id]}
              alt={`project-${id}`}
              className={isAnimating[id] ? appStyles.fadeIn : appStyles.fadeOut}
            />
            <div className={appStyles.textContent}>
              <div>
                <h4>Project #{id + 1}</h4>
              </div>
              <div>
                <span className={appStyles.description}>
                  We believe in the power of stories that inspire, educate, and
                  entertain.
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <div className={appStyles.workCard}>
        <Link to={`/portfolio`}>
          <img draggable="false" src={workHead} alt="logo" />
          <div className={appStyles.textContent}>
            <div>
              <label>Go to the portfolio</label>
            </div>
          </div>
          <div className={appStyles.button}>
            <img draggable="false" src={moreArrow} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WorkCardElement;
