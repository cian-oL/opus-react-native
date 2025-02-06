import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";

const Page = () => {
  const { phone, isSignIn } = useLocalSearchParams<{
    phone: string;
    isSignIn?: string;
  }>();
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    if (verificationCode.length === 6) {
      if (isSignIn === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [verificationCode]);

  const verifySignIn = async () => {};

  const verifyCode = async () => {};

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
