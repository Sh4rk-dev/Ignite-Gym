import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignIn } from "@screens/public/Signin";
import { SignUp } from "@screens/public//SignUp";

type AuthRoutes = {
  signIn: undefined;
  singUp: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
    >
      <Screen name="signIn" component={SignIn} />
      <Screen name="singUp" component={SignUp} />
    </Navigator>
  );
}
