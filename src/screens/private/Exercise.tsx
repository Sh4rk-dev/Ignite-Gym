import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HStack, Heading, Icon, Text, VStack } from "native-base";

import BodySVG from "@assets/body.svg";

import { Feather } from "@expo/vector-icons";
import { AppNavigationTabsRoutesProps } from "@routes/app.routes";

export function Exercise() {
  const navigation = useNavigation<AppNavigationTabsRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px={8} pt={12} bg={"gray.600"}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon size={6} as={Feather} name="arrow-left" color={"green.500"} />
        </TouchableOpacity>

        <HStack
          mt={4}
          mb={8}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <Heading color={"gray.100"} fontSize={"lg"} flexShrink={1}>
            Puxada frontal
          </Heading>

          <HStack alignItems={"center"}>
            <BodySVG />

            <Text color={"gray.200"} ml={1} textTransform={"capitalize"}>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
