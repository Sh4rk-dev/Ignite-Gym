import { Center, Skeleton, Text, VStack } from "native-base";
import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { Avatar } from "@components/Avatar";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
  const [loading, setLoading] = useState(false);

  return (
    <VStack flex={1}>
      <Header>
        <Header.Title position={"center"} title="Minha Conta" />
      </Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
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

          <Input
            bg={"gray.600"}
            autoCapitalize="none"
            placeholder="Renan Rapace"
            keyboardType="default"
          />

          <Input
            isDisabled
            bg={"gray.600"}
            autoCapitalize="none"
            placeholder="renanrapace13@gmail.com"
            keyboardType="email-address"
          />
        </Center>

        <Center px={10} mb={9} mt={12}>
          <Text
            color={"gray.100"}
            fontSize={"md"}
            mb={2}
            alignSelf={"flex-start"}
          >
            Alterar senha
          </Text>

          <Input
            secureTextEntry
            bg={"gray.600"}
            autoCapitalize="none"
            placeholder="Senha antiga"
          />

          <Input
            secureTextEntry
            bg={"gray.600"}
            autoCapitalize="none"
            placeholder="Nova senha"
          />

          <Input
            secureTextEntry
            bg={"gray.600"}
            autoCapitalize="none"
            placeholder="Confirme a nova senha"
          />
          <Button disabled title="Atualizar" mt={6} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
