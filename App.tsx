import { Loading } from "@components/loading";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { SignUp } from "@screens/SignUp";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import { THEME } from "src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="inverted" backgroundColor="transparent" translucent />

      {fontsLoaded ? <SignUp/> : <Loading />}
    </NativeBaseProvider>
  );
}
