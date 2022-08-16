import React from "react";
import "./Birthday.css";
import ls from "local-storage";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

export const Birthdatecard = (props) => {
  const Name = ls("user").firstName;

  return (
    <div className="birthday-card">
      <div className="card">
        <div className="cake">
          <div className="cake-bottom"></div>
          <div className="cake-middle"></div>
          <div className="cake-top"></div>
          <div className="candle"></div>
          <div className="flame"></div>
          <div className="shadow"></div>
        </div>
        <div className="confetti">
          <div className="squareOne"></div>
          <div className="squareTwo"></div>
          <div className="squareThree"></div>
          <div className="squareFour"></div>
          <div className="squareFive"></div>
          <div className="squareSix"></div>
          <div className="squareSeven"></div>
          <div className="squareEight"></div>
          <div className="squareNine"></div>
          <div className="squareTen"></div>
        </div>
        <div>
          <IconButton className="button" onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="text">
          <span className="line">Happy Birthday!&nbsp;{Name}</span>
        </div>

        <div className="text-container">
          <p>
            I hope your special day will bring you lots of happiness, love, and
            fun. You deserve them a lot. Enjoy!
          </p>
          <p>Hope your day goes great!</p>
        </div>
      </div>
    </div>
  );
};
