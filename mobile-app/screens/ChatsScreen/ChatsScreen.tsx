import React from "react";
import PropTypes from "prop-types";
import SearchBar from "../../Components/SearchBar";
import { Text, View } from "react-native";
import { Button } from "tamagui";

ChatsScreen.propTypes = {};

function ChatsScreen(props) {
  return (
    <View style={{ marginHorizontal: 5 }}>
      <SearchBar />
      <Text>chats Screen</Text>
    </View>
  );
}

export default ChatsScreen;
