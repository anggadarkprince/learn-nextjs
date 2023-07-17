import classes from './newsletter-registration.module.css';
import {FormEvent} from "react";

function NewsletterRegistration() {
  function registrationHandler(event: FormEvent) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button style={{paddingLeft: 10, paddingRight: 10}}>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
