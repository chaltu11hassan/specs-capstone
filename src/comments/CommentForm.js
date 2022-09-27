const CommentForm = () => {
  return (
    <form className="comment-form">
      <textarea
        className="comment-textarea"
        type="text"
        placeholder="Comment"
      />
      <button>Add Comment</button>
    </form>
  );
};
export default CommentForm;


