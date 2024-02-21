import React from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import { Avatar, Stack, XStack } from "tamagui";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../utils/context/AuthContext";

HomeHeader.propTypes = {};

function HomeHeader(props) {
  const { user } = useAuth();

  const navigation = useNavigation();

  // const { user } = useContext(AuthContext);
  // console.log(user)
  const redirect = (to: string) => {
    navigation.navigate(to);
  };
  return (
    <XStack justifyContent="space-between" alignItems="center">
      <XStack alignItems="center" gap="$2">
        <TouchableOpacity>
          <Avatar circular size="$4">
            <Avatar.Image
              accessibilityLabel="Nate Wienert"
              src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>
        </TouchableOpacity>
        <Stack>
          <Text
            style={{
              color: "#A4A4A4",
              marginVertical: 0,
              paddingVertical: 0,
              textTransform: "capitalize",
            }}
          >
            good day
          </Text>
          <Text
            style={{
              fontWeight: "700",
              marginVertical: 0,
              paddingVertical: 0,
            }}
          >
            {user?.username}
          </Text>
        </Stack>
      </XStack>
    </XStack>
  );
}

export default HomeHeader;
