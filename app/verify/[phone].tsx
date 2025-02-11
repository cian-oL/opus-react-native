import { View, Text, Platform } from "react-native";
import { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { SafeAreaView } from "react-native-safe-area-context";

const CELL_COUNT = 6;

const Page = () => {
  const { phone, isSignIn } = useLocalSearchParams<{
    phone: string;
    isSignIn?: string;
  }>();
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const [verificationCode, setVerificationCode] = useState("");
  const [value, setValue] = useState("");

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
    <SafeAreaView className="m-4 gap-6">
      <Text className="text-orange-500 text-3xl font-rubik-extrabold uppercase">
        Enter Your Code
      </Text>
      <Text className="font-rubik text-xl">
        Code sent to {phone}, unless you already have an acoount.
      </Text>
      <Text className="font-rubik text-xl">
        Already have an account?{" "}
        <Link href="/login" className="text-orange-600 underline">
          Login here.
        </Link>
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        keyboardType="numeric"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({
          android: "sms-otp",
          default: "one-time-code",
        })}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Text key={index} onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default Page;
