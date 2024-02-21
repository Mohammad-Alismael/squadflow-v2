import { View, Text } from "react-native";
import SearchBar from "../../Components/SearchBar";
import { Button } from "tamagui";
// import { Plus } from "@tamagui/lucide-icons";
function HomeScreen({ navigation }) {
  return (
    <View style={{ marginHorizontal: 5 }}>
      <SearchBar />
      <Text>Home Screen</Text>
      <Button
        // icon={<Plus size="$4" />}
        onPress={() => navigation.replace("Login")}
      >
        Go to Login
      </Button>
    </View>
  );
}

export default HomeScreen;
