

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { SearchContainer } from "./style";
import { Input } from "../input/Input";
import { Icon } from "../Icon/Icon";

export const Search = ({ className, searchPhrase, onChange }) => {
  return (
    <SearchContainer>
      <Input
        value={searchPhrase}
        placeholder="Поиск по заголовкам..."
        onChange={onChange}
      />
      <Icon inactive={true} icon={FavoriteBorderIcon} size="21px" />
    </SearchContainer>
  );
};


