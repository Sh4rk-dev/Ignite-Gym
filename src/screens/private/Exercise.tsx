import { TouchableOpacity } from "react-native";
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { AppNavigationTabsRoutesProps } from "@routes/app.routes";

import BodySVG from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepetitionsSVG from "@assets/repetitions.svg";

import { Button } from "@components/Button";

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
        {
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
        }
      </VStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack p={8}>
          <Image
            h={80}
            mb={3}
            w={"full"}
            rounded={"lg"}
            resizeMode="cover"
            overflow={"hidden"}
            alt="None do exercício"
            source={{
              uri: "https://www.fiqueinforma.com/wp-content/uploads/2008/12/puxadas.jpg",
            }}
          />

          <Box bg={"gray.600"} rounded={"md"} pb={4} px={4}>
            <HStack
              mb={6}
              mt={5}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              <HStack>
                <SeriesSVG />
                <Text color={"gray.200"} ml={2}>
                  3 séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSVG />
                <Text color={"gray.200"} ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>
            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
