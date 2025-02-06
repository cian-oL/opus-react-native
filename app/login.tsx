import { Link, useRouter } from "expo-router";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import images from "@/constants/images";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Login = () => {
  const [countryCode, setCountryCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const router = useRouter();
  const { signIn } = useSignIn();

  const isSendButtonDisabled =
    countryCode === "" || countryCode[0] !== "+" || mobileNumber === "";

  const handleCountryCode = (codeEntry: string) => {
    if (codeEntry.length > 0 && codeEntry[0] !== "+") {
      codeEntry = "+" + codeEntry;
    }

    setCountryCode(codeEntry);
  };

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = countryCode + mobileNumber;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });

        const firstPhoneFactor: any = supportedFirstFactors?.find(
          (factor) => factor.strategy === "phone_code"
        );

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        router.push({
          pathname: "/verify/[phone]",
          params: {
            phone: fullPhoneNumber,
            isSignIn: "true",
          },
        });
      } catch (err) {
        console.error("error", JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", err.errors[0].message);
          }
        }
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
      <View className="m-4 gap-6">
        <Text className="text-orange-500 text-3xl font-rubik-extrabold uppercase">
          Welcome Back
        </Text>
        <Text className="font-rubik text-xl">
          Enter your phone number associated with your account:
        </Text>
        <View className="flex-row gap-4">
          <TextInput
            placeholder="+44"
            placeholderTextColor="rgba(169, 169, 169, 1)"
            keyboardType="numeric"
            maxLength={4}
            value={countryCode}
            onChangeText={handleCountryCode}
            className="text-xl font-rubik-semibold border-2 rounded-xl w-1/5 px-2 py-2"
          />
          <TextInput
            placeholder="Mobile Number"
            placeholderTextColor="rgba(169, 169, 169, 1)"
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            className="text-xl font-rubik-semibold border-2 rounded-xl flex-1 px-2 py-2"
          />
        </View>
        <Text className="font-rubik text-xl">
          No account?{" "}
          <Link href="/sign-up" className="text-orange-600 underline">
            Sign up here.
          </Link>
        </Text>
      </View>
      <TouchableOpacity
        disabled={isSendButtonDisabled}
        className={`w-4/5 rounded-lg bg-orange-400 mx-auto py-4 ${
          isSendButtonDisabled && "opacity-50"
        }`}
      >
        <Text className="text-2xl font-rubik-extrabold mx-auto">
          Send Confirmation Code
        </Text>
      </TouchableOpacity>
      <View className="flex-row items-center my-4">
        <View className="flex-1 bg-orange-500 h-0.5 mx-2" />
        <Text className="font-rubik italic text-xl mx-2">or</Text>
        <View className="flex-1 bg-orange-500 h-0.5 mx-2" />
      </View>
      <View className="gap-6">
        <TouchableOpacity
          onPress={() => console.log("Email selected")} // TODO: Add functionaility
          className="flex-row items-center gap-4 mx-auto"
        >
          <Ionicons name="mail" size={28} color={"#000"} />
          <Text className="font-rubik-medium text-2xl">
            Continue with email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Email selected")} // TODO: Add functionaility
          className="flex-row items-center gap-4 mx-auto"
        >
          <Ionicons name="logo-google" size={28} color={"#000"} />
          <Text className="font-rubik-medium text-2xl">
            Continue with Gmail
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Email selected")} // TODO: Add functionaility
          className="flex-row items-center gap-4 mx-auto"
        >
          <Ionicons name="logo-apple" size={28} color={"#000"} />
          <Text className="font-rubik-medium text-2xl">
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
