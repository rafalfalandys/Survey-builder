//@ts-expect-error package comes with no types
import Icon, { AngleRightS } from "@synerise/ds-icon";
import { useState } from "react";
import classes from "./Collapse.module.scss";

type CollapseProps = {
  header: string;
};

const Collapse: React.FC<CollapseProps> = ({ children, header }) => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={classes.collapse} onClick={clickHandler}>
        <Icon
          component={<AngleRightS />}
          color="#384350"
          className={`${classes.icon} ${isOpen && classes.rotated}`}
        />
        <span className={classes.header}>{header}</span>
      </div>
      {isOpen && children}
    </>
  );
};

export default Collapse;
