import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../../../../hooks";
import {
  openModal,
  CLOSE_MODAL,
  removeCommentAsync,
} from "../../../../../action";
import { selectUserRole } from "../../../../../selectors";
import { ROLE } from "../../../../../constans";


import { Author, CommentContainer, CommentItem, InfoPanel, PublishedAt } from "./style";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Icon } from "../../../../../components";
export const Comment = ({
  postId,
  id,
  author,
  content,
  publishedAt,
}) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const userRole = useSelector(selectUserRole);
  // const onCommentRemove = (id) => {
  //   dispatch(
  //     openModal({
  //       text: " Удалить комментарий?",
  //       onConfirm: () => {
  //         dispatch(removeCommentAsync(requestServer, postId, id));
  //         dispatch(CLOSE_MODAL);
  //       },
  //       onCancel: () => dispatch(CLOSE_MODAL),
  //     })
  //   );
  // };

  const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);
  return (
    <CommentContainer>
      <CommentItem>
        <InfoPanel>
          <Author>
          <Icon
            icon={AccountCircleIcon}
            margin="0 0 0 10px"
            size="21px"
            // onClick={() => onNewCommentAdd(productId, newComment)}
          />
            {author}
          </Author>
          <PublishedAt>
            {/* <Icon
              id={AddShoppingCartIcon}
              margin="0 10px 0 0"
              size="18px"
              onClick={() => {}}
            /> */}
            {publishedAt}
          </PublishedAt>
        </InfoPanel>
        <div className="comment-text">{content}</div>
      </CommentItem>
      {/* {isAdminOrModerator && (
        <Icon
          id={AddShoppingCartIcon}
          margin="0 0 0 10px"
          size="21px"
          onClick={() => onCommentRemove(id)}
        />
      )} */}
    </CommentContainer>
  );
};


// CommentContainer.prototype = {
//   postId: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
//   author: PropTypes.string.isRequired,
//   content: PropTypes.string.isRequired,
//   publishedAt: PropTypes.string.isRequired,
// };