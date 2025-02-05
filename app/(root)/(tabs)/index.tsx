import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-2xl my-10">
        Make Finances Your Masterpiece!
      </Text>
      <Link href="/sign-in">Sign in</Link>
      <Link href="/explore">Explore</Link>
    </View>
  );
}
