import classes from './comment-list.module.css';

function CommentList() {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      <li>
        <p>Comment title</p>
        <div>
          By <address>User</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
