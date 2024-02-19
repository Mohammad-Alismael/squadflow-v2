import React from "react";
import PropTypes from "prop-types";
import MyTabs from "../../Components/MyTabs";
import { Button, Text, View } from "react-native";

ProfileScreen.propTypes = {};

function ProfileScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>profile Screen</Text>
    </View>
  );
}

export default ProfileScreen;
