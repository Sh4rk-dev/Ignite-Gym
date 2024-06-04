import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, ScrollView, VStack, Skeleton, Text } from "native-base";

import { Avatar } from "@components/Avatar";
import { Header } from "@components/Header";

const PHOTO_SIZE = 33;

export function Profile() {
  const [loading, setLoading] = useState(false);

  return (
    <VStack flex={1}>
      <Header>
        <Header.Title position={"center"} title="Minha Conta" />
      </Header>

      <ScrollView>
        <Center mt={6} px={10}>
          {loading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={"full"}
              startColor={"gray.600"}
              endColor={"gray.400"}
            />
          ) : (
            <Avatar
              size={PHOTO_SIZE}
              alt="Imagem do usuário"
              source={{ uri: "https://github.com/Sh4rk-dev.png" }}
            />
          )}
          <TouchableOpacity>
            <Text
              color={"green.500"}
              fontWeight={"bold"}
              fontSize={"md"}
              mt={2}
              mb={8}
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>
        </Center>
      </ScrollView>
    </VStack>
  );
}
