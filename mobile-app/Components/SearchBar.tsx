import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "tamagui";

SearchBar.propTypes = {};

function SearchBar(props) {
  const [keyword, setKeyword] = useState("");
  return (
    <Input
      marginVertical="$2"
      size="$5"
      placeholder="search..."
      onChangeText={setKeyword}
      secureTextEntry={true}
      borderWidth={4}
      backgroundColor="#fff"
    />
  );
}

export default SearchBar;
