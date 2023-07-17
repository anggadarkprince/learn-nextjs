import classes from './comment-list.module.css';

function CommentList(props: {items: any[]}) {
  const items = props.items;
  return (
    <ul className={classes.comments}>
      {items.map(item => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
