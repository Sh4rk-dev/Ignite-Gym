import { Icon, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

import { Header } from "@components/Header";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationTabsRoutesProps } from "@routes/app.routes";

export function Exercise() {
  const navigation = useNavigation<AppNavigationTabsRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <Header>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon size={6} as={Feather} name="arrow-left" color={"green.500"} />
        </TouchableOpacity>
      </Header>
    </VStack>
  );
}
