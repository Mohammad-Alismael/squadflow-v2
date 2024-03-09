import React from "react";
import PropTypes from "prop-types";
import { Button, Fieldset, Label, YStack } from "tamagui";
import TextField from "../../Components/TextFields";
import PeopleContainer from "./Components/PeopleContainer";
import { useAuth } from "../../utils/context/AuthContext";

CommunityScreen.propTypes = {};

function CommunityScreen(props) {
  const { user } = useAuth();

  return (
    <YStack gap="$3" marginHorizontal="$3" marginVertical="$5">
      <TextField label="community name" />
      <TextField label="community code" disabled={true} />
      <PeopleContainer userIds={[]} />
      <Fieldset gap="$1">
        <Label unstyled>
          By pressing Leave Community, I understand that i will no longer have
          access to my community work spaces and group chats
        </Label>
        <Button width="100%" borderRadius="$2" backgroundColor="$green1">
          leave community {user.communityId}
        </Button>
      </Fieldset>
    </YStack>
  );
}

export default CommunityScreen;
