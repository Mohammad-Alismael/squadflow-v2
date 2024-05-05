import { Avatar, Fieldset, Label, YStack } from "tamagui";
import { StyleSheet } from "react-native";

function PeopleContainer({ userIds }) {
  // const { data: participants, isLoading } =
  //     useGetCommunityParticipants(userIds);

  // if (isLoading) return <Text>loading ...</Text>;
  return (
    <Fieldset gap="$2">
      <Label unstyled htmlFor="username" style={styles.label}>
        participants
      </Label>
      <YStack gap="$-2" flexDirection="row" justifyContent="flex-start">
        {[].map((val, index) => {
          return (
            <Avatar circular size="$4">
              <Avatar.Image src={val.photoURL} />
              <Avatar.Fallback bc="red" />
            </Avatar>
          );
        })}
      </YStack>
    </Fieldset>
  );
}

const styles = StyleSheet.create({
  label: {
    textTransform: "capitalize",
    fontWeight: "800",
  },
});

export default PeopleContainer;
