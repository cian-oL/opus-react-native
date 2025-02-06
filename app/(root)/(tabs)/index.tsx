import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

import images from "@/constants/images";

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.opusOrchestra}
          resizeMode="contain"
          className="w-full h-1/2"
        />
        <View className="px-10 my-10">
          <View className="flex-row items-center justify-around">
            <Text className="text-3xl uppercase font-rubik-bold">
              Welcome to
            </Text>
            <Image
              source={images.opusLogoOrange}
              resizeMode="contain"
              className="w-1/2"
            />
          </View>
          <Text className="text-2xl text-center text-black font-rubik my-2">
            Make Finances Your Masterpiece!
          </Text>
        </View>
        <View className="items-center">
          <Link href="/login" asChild>
            <TouchableOpacity className="w-4/5 rounded-lg bg-orange-400 my-2 py-4">
              <Text className="text-2xl font-rubik-extrabold mx-auto">
                Login
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href="/sign-up" asChild>
            <TouchableOpacity className="w-4/5 rounded-lg bg-orange-400 my-2 py-4">
              <Text className="text-2xl font-rubik-extrabold mx-auto">
                Sign Up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
