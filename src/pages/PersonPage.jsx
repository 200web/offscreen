import React from "react";
import personStyle from "../scss/PersonPage.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import arrow from "../assets/img/Arrow.png";
import { setIsLoaded } from "../Redux/introSlice";

const PersonPage = () => {
  const { id } = useParams();
  const { cards } = useSelector((state) => state.teamCard);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(setIsLoaded(true));
  }, []);

  const handleBackToTeamClick = () => {
    navigate("/", { state: { scrollToTeam: true } });
  };

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
        </div>
        <div key={id} className={personStyle.portrait}>
          <img
            id={`video-${id}`}
            src={cards[id].image}
            alt={`portrait-${id}`}
          />
        </div>
        <div className={personStyle.button}>
          {cards[id].description !== "" && (
            <div
              onClick={handleBackToTeamClick}
              className={personStyle.contactButton}
            >
              <img draggable="false" src={arrow} alt="arrow" />
              <span>BACK TO TEAM</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonPage;
