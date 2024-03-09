import React from "react";
import PropTypes from "prop-types";
import SearchBar from "../../Components/SearchBar";
import { Text, View } from "react-native";

ProjectsScreen.propTypes = {};

function ProjectsScreen(props) {
  return (
    <View style={{ marginHorizontal: 5 }}>
      <SearchBar />
      <Text>projects Screen</Text>
    </View>
  );
}

export default ProjectsScreen;
