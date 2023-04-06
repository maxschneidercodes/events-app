import classes from './comment-list.module.css';
import Comment from '../../types/Comment';

function CommentList(props: { comments: Comment[]; }) {

  const { comments } = props

  return (
    <ul className={classes.comments}>
      {comments.map((item, index) => (
        <li key={index}>
          {item.text}
          <div>
            <address>{item.name}</address>
          </div>
        </li>
      )
      )}
    </ul>
  );
}

export default CommentList;
