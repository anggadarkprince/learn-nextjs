import classes from './logistics-item.module.css';
import {PropsWithChildren} from "react";

function LogisticsItem(props: PropsWithChildren<{icon: any}>) {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
