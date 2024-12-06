
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "./components";
import { Icon } from "../../../../components";
import { selectUserRole } from "../../../../selectors";
import { addCommentAsync, loadCommentsAsync} from "../../../../action";
import { CommentsContainer, NewComment } from "./style";
import { ROLE } from "../../../../constans";
import SendIcon from "@mui/icons-material/Send";

export const Comments = ({ comments, productId }) => {
  const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();

  const userRole = useSelector(selectUserRole);

  
  useEffect(() => {
    dispatch(loadCommentsAsync(productId)); 
  }, [dispatch, productId]);


  const onNewCommentAdd = (productId, content) => {
    dispatch(addCommentAsync(productId, content));
    setNewComment("");
  };

  const isGuest = userRole === ROLE.GUEST;
  const commentList = comments && comments.items ? comments.items : [];
  

  return (
    <CommentsContainer>
      {!isGuest && (
        <NewComment>
          <textarea
            name="comment"
            value={newComment}
            placeholder="Комментарий..."
            onChange={({ target }) => setNewComment(target.value)}
            style={{ width: '100%', height: '100px', resize: 'none' }}
          >

          </textarea>
          <Icon
            icon={SendIcon}
            margin="0 0 0 10px"
            size="21px"
            onClick={() => onNewCommentAdd(productId, newComment)}
          />
        </NewComment>
      )}
      <div className="comments">
      {commentList.length === 0 ? (  
        <p>Здесь пока нет отзывов, оставьте свой!</p>  
      ) : (
        commentList.map((comment) => (
          
          <Comment
            key={comment.id}
            productId={productId}
            id={comment.id}
            author={comment.author.login}
            content={comment.content}
            publishedAt={comment.publishedAt}
          />
          
        ))
      )}
      </div>
    </CommentsContainer>
  );
};
