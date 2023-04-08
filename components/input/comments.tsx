import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import Comment from '../../types/Comment';
import NotificationContext from '../../context/context';
import { NotificationStauts } from '../../types/NotificationStatus';
import { json } from 'stream/consumers';

function Comments(props: { eventId: any; }) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("/api/comments/" + eventId)
      .then(res => res.json())
      .then(data => {
        setComments(data.comments)
      })
  }, [])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: any) {
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        notificationCtx.showNotification(
          {
            title: "Success",
            message: "Comment saved",
            status: NotificationStauts.SUCCESS
          })
      }).catch(err => {
        notificationCtx.showNotification(
          {
            title: "Error",
            message: "An Error Occured" + JSON.stringify(err),
            status: NotificationStauts.ERROR
          })
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
