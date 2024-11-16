import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../../../../components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const PostCardContainer = ({
  className,
  id,
  title,
  imgUrl,
  desc,
  publishedAt,
  commentsCount,
}) => {
  return (
    <div className={className}>
      <Link to={`/products/${id}`}>
        <img src={imgUrl} alt={title} />
        <div className="post-card-footer">
          <h4>{title}</h4>
          <h4>{desc}</h4>
          <div className="post-card-info">
            <div className="published-at">
              <Icon
                inactive={true}
                icon={FavoriteBorderIcon}
                margin="0 7px 0 0"
                size="18px"
                onClick={() => {}}
              />
              {publishedAt}
            </div>
            <div className="comment-count">
              <Icon
                inactive={true}
                icon={FavoriteBorderIcon}
                margin="0 7px 0 0"
                size="18px"
                onClick={() => {}}
              />
              {commentsCount}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const PostCard = styled(PostCardContainer)`
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 20px;
  border: 1px solid #000;
  height: 230px;
  & img {
    display: block;
    width: 100%;
  }

  & h4 {
    margin: 5px 0 0;
  }

  & .post-card-footer {
    border-top: 1px solid #000;
    padding: 5px;
  }

  & .post-card-info {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    margin-top: 5px;
  }

  & .published-at {
    display: flex;
  }

  & .comment-count {
    display: flex;
  }
`;
