import { Link, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import images from "@/constants/images";

const SignUp = () => {
  const router = useRouter();
  const { signUp } = useSignUp();

  const [countryCode, setCountryCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const isSendButtonDisabled =
    countryCode === "" || countryCode[0] !== "+" || mobileNumber === "";

  const handleCountryCode = (codeEntry: string) => {
    if (codeEntry.length > 0 && codeEntry[0] !== "+") {
      codeEntry = "+" + codeEntry;
    }

    setCountryCode(codeEntry);
  };

  const onSignUp = async () => {
    const fullPhoneNumber = `${countryCode}-${mobileNumber}`;

    try {
      await signUp!.create({ phoneNumber: fullPhoneNumber });
      signUp!.preparePhoneNumberVerification();

      router.push({
        pathname: "/verify/[phone]",
        params: { phone: fullPhoneNumber },
      });
    } catch (err) {
      console.error("Error sigining up", err);
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
          Get Started
        </Text>
        <Text className="font-rubik text-xl">
          Enter your phone number to receive a confirmation code:
        </Text>
        <View className="flex-row gap-4">
          <TextInput
            placeholder="+44"
            placeholderTextColor="rgba(169, 169, 169, 1)"
            keyboardType="number-pad"
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
          Already have an account?{" "}
          <Link href="/login" className="text-orange-600 underline">
            Login here.
          </Link>
        </Text>
      </View>
      <TouchableOpacity
        onPress={onSignUp}
        disabled={isSendButtonDisabled}
        className={`w-4/5 rounded-lg bg-orange-400 mx-auto py-4 ${
          isSendButtonDisabled && "opacity-50"
        }`}
      >
        <Text className="text-2xl font-rubik-extrabold mx-auto">
          Send Confirmation Code
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
