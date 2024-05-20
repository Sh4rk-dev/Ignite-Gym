import { Loading } from "@components/loading";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { SafeAreaView, Text, View } from "react-native";
import { THEME } from "src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="auto" backgroundColor="transparent" translucent />

      {fontsLoaded ? <Text>Hello Word</Text> : <Loading />}
    </NativeBaseProvider>
  );
}
