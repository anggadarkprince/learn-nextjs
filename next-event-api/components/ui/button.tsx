import Link from 'next/link';
import {MouseEventHandler, PropsWithChildren} from 'react';

import classes from './button.module.css';

type ButtonProp = {
  link?: string;
  onClick?: MouseEventHandler;
};

function Button(props: PropsWithChildren<ButtonProp>) {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
