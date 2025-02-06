import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const AuthRoutesLayout = () => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <Redirect href="/" /> : <Stack />;
};

export default AuthRoutesLayout;
