import { Image, View, Text, Alert, KeyboardAvoidingView } from "react-native";
import { Fragment, useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import images from "@/constants/images";

const CELL_COUNT = 6;

const Page = () => {
  const { phone, isSignIn } = useLocalSearchParams<{
    phone: string;
    isSignIn?: string;
  }>();
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();
  const [verificationCode, setVerificationCode] = useState("");

  const ref = useBlurOnFulfill({
    value: verificationCode,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verificationCode,
    setValue: setVerificationCode,
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

  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "phone_code",
        code: verificationCode,
      });
      await setActive!({ session: signIn!.createdSessionId });
    } catch (err) {
      console.error("Error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  const verifyCode = async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({ code: verificationCode });
      await setActive!({ session: signUp!.createdSessionId });
    } catch (err) {
      console.error("Error", JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  return (
    <KeyboardAvoidingView className="h-full bg-white">
      <Image
        source={images.opusLogoOrange}
        resizeMode="contain"
        className="w-full h-1/5 mt-10"
      />
      <View className="m-4 gap-8">
        <Text className="text-orange-500 text-3xl font-rubik-extrabold uppercase">
          Enter Your Code
        </Text>
        <Text className="font-rubik text-xl">
          Code sent to {phone}, unless you already have an acoount.
        </Text>
        <CodeField
          ref={ref}
          {...props}
          value={verificationCode}
          onChangeText={setVerificationCode}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          testID="my-code-input"
          className="code-field-root"
          renderCell={({ index, symbol, isFocused }) => (
            <Fragment key={index}>
              <View
                key={index}
                onLayout={getCellOnLayoutHandler(index)}
                className="cell-root"
              >
                <Text className="cell-text">
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
              {index === 2 ? (
                <View key={`separator-${index}`} className="separator" />
              ) : null}
            </Fragment>
          )}
        />
        <Text className="font-rubik text-xl">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-600 underline">
            Login here.
          </Link>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page;
