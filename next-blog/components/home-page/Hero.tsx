import classes from './Hero.module.css';
import Image from "next/image";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/profile.png" alt="Profile image" width={250} height={250} />
      </div>
      <h1>Hi, I'm Angga</h1>
      <p>I blog about web development</p>
    </section>
  )
}

export default Hero;
