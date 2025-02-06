import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, View } from "react-native";

import images from "@/constants/images";

const SignIn = () => {
  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.opusOrchestra}
          className="w-full h-2/3"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-xl text-center uppercase font-rubik-bold">
            Welcome to <Text className="text-orange-400">Opus</Text>
          </Text>
          <Text className="text-2xl text-center text-black font-rubik">
            Make Finances {"\n"} Your Masterpiece!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
