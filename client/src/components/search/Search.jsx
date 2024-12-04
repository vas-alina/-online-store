import SearchIcon from "@mui/icons-material/Search";
import { SearchContainer } from "./style";
import { Input } from "../input/Input";
import { Icon } from "../Icon/Icon";

export const Search = ({ searchPhrase, onChange }) => {
  return (
    <SearchContainer>
      <Input
        value={searchPhrase}
        placeholder="Поиск по заголовкам..."
        onChange={onChange}
      />
      <Icon inactive={true} icon={SearchIcon} size="21px" />
    </SearchContainer>
  );
};
