import { Loading } from "@components/loading";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" backgroundColor="transparent" translucent />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {fontsLoaded ? <Text>Hello Word</Text> : <Loading />}
      </View>
    </SafeAreaView>
  );
}
