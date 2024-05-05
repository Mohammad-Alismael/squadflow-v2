import React from "react";
import { Text } from "tamagui";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../utils/context/AuthContext";
import ROUTES from "../../utils/routes";

ProfileRightHeader.propTypes = {};

function ProfileRightHeader(props) {
  const navigation = useNavigation();

  const { user, isLoading, signOut } = useAuth();
  const goToLogout = () => {
    signOut().then((r) => {
      navigation.navigate(ROUTES.LOGIN);
    });
  };
  return (
    <TouchableOpacity onPress={goToLogout}>
      <Text>Sign out</Text>
    </TouchableOpacity>
  );
}

export default ProfileRightHeader;
