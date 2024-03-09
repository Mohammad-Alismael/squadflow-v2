import React from "react";
import PropTypes from "prop-types";
import MyTabs from "../../Components/MyTabs";
import { View } from "react-native";
import { Button, Text, Avatar, YStack } from "tamagui";
import SettingsItem from "../../Components/SettingsItem";
import ROUTES from "../../utils/routes";
import { useAuth } from "../../utils/context/AuthContext";

ProfileScreen.propTypes = {};

function ProfileScreen({ navigation }) {
  const { user } = useAuth();

  return (
    <YStack marginHorizontal="$3" marginVertical="$5">
      <YStack justifyContent="center">
        <YStack marginVertical={20} alignItems="center">
          <Avatar circular size={160} alignSelf="center" elevation={30}>
            <Avatar.Image src={user.photoURL} />
            <Avatar.Fallback bc="black" />
          </Avatar>
          <YStack alignItems="center">
            <Text>@{user.username}</Text>
            <Button
              height={30}
              onPress={() => {
                navigation.navigate(ROUTES.EDIT_PROFILE);
              }}
              backgroundColor="$green11"
              borderWidth={3}
              borderRadius="$2"
              marginTop="$3"
            >
              <Text>Edit</Text>
            </Button>
          </YStack>
        </YStack>
        <YStack gap={10} marginBottom={60}>
          <SettingsItem
            text="My Projects"
            iconAfter="chevron-right"
            to={ROUTES.MY_PROJECT_SCREEN}
          />
          <SettingsItem
            text="Manege Community"
            iconAfter="chevron-right"
            to={ROUTES.JOIN_A_TEAM}
          />
          <SettingsItem
            text="Settings"
            iconAfter="chevron-right"
            to={ROUTES.SETTINGS_SCREEN}
          />
          {/*<SettingsItem*/}
          {/*  text="My Tasks"*/}
          {/*  iconAfter="chevron-right"*/}
          {/*  backgroundColor="$Button3/BackgroundColor"*/}
          {/*  to={ROUTES.MY_TASKS}*/}
          {/*  textColor="$Button3/TextColor"*/}
          {/*  borderColor="$Button3/BorderColor"*/}
          {/*/>*/}
        </YStack>
      </YStack>
    </YStack>
  );
}

export default ProfileScreen;
