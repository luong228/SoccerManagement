import React from "react";
import styles from ""
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import card_team_data from "../../assets/fake-data/CardTeams";
import CardTeam from "../cards/cardTeam/cardTeam";

const NewStyleCard =CardTeam`

`
const RankTeam = () => {
  return (
    <div className="table">
      {card_team_data.getSortCards(8).map((item, index) => (
        <CardTeam
          img={item.img}
          title={item.title}
          logo={item.logo}
          stadium={item.stadium}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default RankTeam;
