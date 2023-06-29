import classes from './error-alert.module.css';
import {PropsWithChildren} from "react";

function ErrorAlert(props: PropsWithChildren) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
