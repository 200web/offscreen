import React from "react";
import personStyle from "../scss/PersonPage.module.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import arrow from "../assets/img/Arrow.png";
import { setIsLoaded } from "../Redux/introSlice";

const PersonPage = () => {
  const { id } = useParams();
  const { cards } = useSelector((state) => state.teamCard);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setIsLoaded(true));
  }, []);

  return (
    <section className={personStyle.section}>
      <div className={personStyle.content}>
        <div className={personStyle.teamDescription}>
          <div className={personStyle.header}>
            <span>Our team</span>
          </div>
          <div className={personStyle.textContent}>
            <div className={personStyle.profession}>{cards[id].profession}</div>
            <div className={personStyle.name}>{cards[id].name}</div>
            <div className={personStyle.addInf}>
              {cards[id].description.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
          <div className={personStyle.button}>
            {cards[id].description !== "" && (
              <Link to={`/`} className={personStyle.contactButton}>
                <img draggable="false" src={arrow} alt="arrow" />
                <span>BACK TO TEAM</span>
              </Link>
            )}
          </div>
        </div>
        <div key={id} className={personStyle.portrait}>
          <img
            id={`video-${id}`}
            src={cards[id].image}
            alt={`portrait-${id}`}
          />
        </div>
      </div>
    </section>
  );
};

export default PersonPage;
