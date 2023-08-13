import classes from './ContactForm.module.css';
import {FormEvent, useEffect, useState} from "react";
import Notification from "@/components/notification/Notification";

async function sendContactData (contactDetails: {name: string, email: string, message: string}) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
}

function ContactForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState<string|null>(null);
  const [requestError, setRequestError] = useState<string>('');

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError('');
      }, 3000);
      return () => {
        clearTimeout(timer);
      }
    }
  }, [requestStatus]);

  async function sendMessageHandler(event: FormEvent) {
    event.preventDefault();

    setRequestStatus('pending');
    try {
      await sendContactData({
        email, name, message
      });
      setRequestStatus('success');
      setEmail('');
      setName('');
      setMessage('');
    } catch (error: any) {
      setRequestStatus('error');
      setRequestError(error?.message);
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    }
  }
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Submit success',
      message: 'Notification successfully sent',
    }
  }
  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Submit error',
      message: requestError,
    }
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required value={email} onChange={event => setEmail(event.target.value)} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required value={name} onChange={event => setName(event.target.value)} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea name="message" id="message" rows={5} required value={message} onChange={event => setMessage(event.target.value)}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status} />
      )}
    </section>
  )
}

export default ContactForm;
