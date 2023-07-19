import classes from './newsletter-registration.module.css';
import {FormEvent, useContext, useRef} from "react";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event: FormEvent) {
    event.preventDefault();

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: 'pending',
    });

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        email: emailInputRef.current?.value
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        response.json().then(data => {
          throw new Error(data.message || 'Something went wrong');
        });
      })
      .then(data => {
        console.log(data);
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Successfully registered for newsletter!',
          status: 'success',
        });
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
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
