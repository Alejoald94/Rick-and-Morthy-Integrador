import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import CardDetails from "./CardsDetails";
const Card = ({ page, results }) => {
  let display;

  if (results) {
    display = results.map((x) => {
      let { id, image, name, status, location } = x;

      return (
        <div key={id} className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark">
          <Link
            style={{ textDecoration: "none" }}
            to={`${page}${id}`}
          >
            <div
              className={`${styles.card} d-flex flex-column justify-content-center`}
            >
              <img className={`${styles.img} img-fluid`} src={image} alt="" />
              <div className={`${styles.content}`}>
                <div className="fs-5 fw-bold mb-4">{name}</div>
                <div className="">
                  <div className="fs-6 fw-normal">Last Location</div>
                  <div className="fs-5">{location.name}</div>
                </div>
              </div>

              {status === "Dead" ? (
                <div className={`${styles.badge} position-absolute badge bg-danger`}>
                  {status}
                </div>
              ) : status === "Alive" ? (
                <div className={`${styles.badge} position-absolute badge bg-success`}>
                  {status}
                </div>
              ) : (
                <div className={`${styles.badge} position-absolute badge bg-secondary`}>
                  {status}
                </div>
              )}
            </div>
          </Link>
          <CardDetails character={x} />
        </div>
      );
    });
  } else {
    display = "No Characters Found :/";
  }

  return <>{display}</>;
};

export default Card;
