import React, { useState } from "react";
import { Button } from "react-native";
import { Input, Stack, YStack, Text } from "tamagui";
import { useAuth } from "../../utils/context/AuthContext";
import ROUTES from "../../utils/routes";

function LoginScreen({ route, navigation }) {
  const { onLogin, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nextScreen = (screenTitle: string) => {
    navigation.navigate(screenTitle);
  };
  const handleClick = async () => {
    const successfulLogin = await onLogin(email, password);
    if (successfulLogin) nextScreen(ROUTES.HOME);
  };
  return (
    <YStack marginHorizontal="$3" marginVertical="$5">
      <Stack padding={10} justifyContent="space-between">
        <Stack padding={10} marginVertical={20}>
          <Text fontSize="$9">Welcome Back!</Text>
          <YStack gap="$2">
            <Input placeholder="Enter your email" onChangeText={setEmail} />
            <Input
              placeholder="Enter your password"
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <Text>forgot password?</Text>
            <Button
              onPress={handleClick}
              disabled={isLoading}
              title={isLoading ? "loading..." : "Sign in"}
            />
            <Text>Don't have an account yet?</Text>
            <Button
              onPress={() => nextScreen(ROUTES.REGISTER)}
              title="Register Now!"
            />
          </YStack>
        </Stack>
      </Stack>
    </YStack>
  );
}

export default LoginScreen;
