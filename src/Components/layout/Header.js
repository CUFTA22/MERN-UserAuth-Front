import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../AuthOptions";
import { ReactComponent as ReactLogo } from "../../assets/react.svg";
import { ReactComponent as MongoLogo } from "../../assets/mongodb.svg";
import { ReactComponent as ExpressLogo } from "../../assets/express.svg";
import { ReactComponent as NodeLogo } from "../../assets/node.svg";

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <MongoLogo />
          <ExpressLogo />
          <ReactLogo />
          <NodeLogo />
          <span>User Auth</span>
        </Link>
      </div>
      <AuthOptions />
    </header>
  );
};

export default Header;
