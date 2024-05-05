import React, { useState } from "react";
import { Input, YStack, Text, XStack, Button } from "tamagui";
import { useAuth } from "../../utils/context/AuthContext";
import ROUTES from "../../utils/routes";

function LoginScreen({ route, navigation }) {
  const { onLogin, isLoading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");

  const nextScreen = (screenTitle: string) => {
    navigation.navigate(screenTitle);
  };
  const handleClick = async () => {
    const successfulLogin = await onLogin(email, password);
    if (successfulLogin) nextScreen(ROUTES.HOME);
  };
  return (
    <YStack marginHorizontal="$4" marginVertical="$5" height="100%">
      <YStack marginBottom="$3" marginTop="$10">
        <Text fontSize="$9">Welcome Back!</Text>
        <Text fontSize="$4">Give credential to sign in your account</Text>
      </YStack>
      <YStack gap="$2">
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
          marginTop="$4"
          backgroundColor="$green11"
          color="$white1"
          onPress={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "loading..." : "Sign in"}
        </Button>
      </YStack>
      <XStack position="absolute" bottom={40} left="12%">
        <Text textAlign="center">Don't have an account yet?</Text>
        <Text
          color="$green11"
          marginHorizontal="$1.5"
          textDecorationLine="underline"
          onPress={() => nextScreen(ROUTES.REGISTER)}
        >
          Sign up
        </Text>
      </XStack>
    </YStack>
  );
}

export default LoginScreen;
