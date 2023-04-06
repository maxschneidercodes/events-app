import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null)

  function registrationHandler(event: { preventDefault: () => void; }) {
    event.preventDefault();

    const enteredeMail = emailInputRef.current?.value

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredeMail }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "success") {
          // modal
        }
      })
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
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

