import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";

import { THEME } from "src/theme";

import { AuthContextProvider } from "@contexts/AuthContext";

import { Loading } from "@components/loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="inverted" backgroundColor="transparent" translucent />

      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
