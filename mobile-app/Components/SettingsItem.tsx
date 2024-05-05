import React from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { Button } from "tamagui";
SettingsItem.propTypes = {};
import Octicons from "react-native-vector-icons/Octicons";

function SettingsItem({ text, to, iconAfter }) {
  const navigation = useNavigation();

  return (
    <Button
      paddingHorizontal="$4"
      size="$5"
      onPress={() => {
        navigation.navigate(to);
      }}
      iconAfter={() => (
        <Button.Icon>
          <Octicons name={iconAfter} size={25} />
        </Button.Icon>
      )}
      spaceFlex={true}
      // borderColor="#fff"
      borderWidth={2}
      backgroundColor="#fff"
    >
      {text}
    </Button>
  );
}

export default SettingsItem;
