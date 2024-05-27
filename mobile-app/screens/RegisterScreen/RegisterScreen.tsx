import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../utils/context/AuthContext";
import ROUTES from "../../utils/routes";
import { Button, Input, Text, XStack, YStack } from "tamagui";

RegisterScreen.propTypes = {};

function RegisterScreen({ route, navigation }) {
  const { onRegister, isLoading } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");

  const nextScreen = (screenTitle: string) => {
    navigation.navigate(screenTitle);
  };
  const handleClick = async () => {
    const successfulLogin = await onRegister(email, username, password);
    if (successfulLogin) nextScreen(ROUTES.HOME);
  };
  return (
    <YStack marginHorizontal="$4" marginVertical="$5" height="100%">
      <YStack marginBottom="$3" marginTop="$10">
        <Text fontSize="$8" fontWeight="$5">
          Welcome to Sqaudflow!
        </Text>
        <Text fontSize="$4">Give credential to create new account</Text>
      </YStack>
      <YStack gap="$2">
        <Input
          borderRadius="$5"
          backgroundColor="#F8FAFC"
          placeholder="Enter your username"
          onChangeText={setUsername}
        />
        <Input
          borderRadius="$5"
          backgroundColor="#F8FAFC"
          placeholder="Enter your email"
          onChangeText={setEmail}
        />
        <Input
          placeholder="Enter your password"
          borderRadius="$5"
          backgroundColor="#F8FAFC"
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Text
          alignSelf="flex-end"
          color="$green11"
          textDecorationLine="underline"
        >
          Forgot password?
        </Text>
        <Button
          marginTop="$2"
          backgroundColor="$green11"
          color="$white1"
          onPress={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "loading..." : "Sign up"}
        </Button>
      </YStack>
      <XStack position="absolute" bottom={40} left="12%">
        <Text textAlign="center">already have an account?</Text>
        <Text
          color="$green11"
          marginHorizontal="$1.5"
          textDecorationLine="underline"
          onPress={() => nextScreen(ROUTES.LOGIN)}
        >
          Sign up
        </Text>
      </XStack>
    </YStack>
  );
}

export default RegisterScreen;
