
import { Input, Icon } from "../../../../components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { SearchContainer } from "./style";

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


