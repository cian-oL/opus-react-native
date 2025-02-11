import { View, Text, Platform, StyleSheet } from "react-native";
import { Fragment, useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { Colors } from "react-native/Libraries/NewAppScreen";
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

  const ref = useBlurOnFulfill({ verificationCode, cellCount: CELL_COUNT });
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
        value={verificationCode}
        onChangeText={setVerificationCode}
        cellCount={CELL_COUNT}
        keyboardType="numeric"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({
          android: "sms-otp",
          default: "one-time-code",
        })}
        testID="my-code-input"
        rootStyle={styles.codeFieldRoot}
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <Text
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
});

export default Page;
