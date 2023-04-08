import { useContext, useRef, useState } from 'react';
import classes from './new-comment.module.css';
import NotificationContext from '../../context/context';
import { NotificationStauts } from '../../types/NotificationStatus';

export default function NewComment(props: { onAddComment: (arg0: { email: string; name: string; text: string; }) => void; }) {
  const [isInvalid, setIsInvalid] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  function sendCommentHandler(event: { preventDefault: () => void; }) {
    event.preventDefault();

    notificationCtx.showNotification(
      {
        title: "Saving.."
        , message: "Comment is Saving"
        , status: NotificationStauts.PENDING
      })

    if (emailInputRef.current
      && nameInputRef.current
      && commentInputRef.current) {

      const enteredEmail = emailInputRef.current.value;
      const enteredName = nameInputRef.current.value;
      const enteredComment = commentInputRef.current.value;

      if (
        !enteredEmail ||
        enteredEmail.trim() === '' ||
        !enteredEmail.includes('@') ||
        !enteredName ||
        enteredName.trim() === '' ||
        !enteredComment ||
        enteredComment.trim() === ''
      ) {
        setIsInvalid(true);
        return;
      }
      props.onAddComment({
        email: enteredEmail,
        name: enteredName,
        text: enteredComment,
      });
    }
  }

  if (emailInputRef.current
    && nameInputRef.current
    && commentInputRef.current) {

    return <p>Loading..</p>
  }

  return (
    <form onSubmit={sendCommentHandler} className={classes.form}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows={5} ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button>Submit</button>
    </form>
  );
}


