import { useState } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { Center, Skeleton, Text, VStack } from "native-base";

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import { Input } from "@components/Input";
import { Avatar } from "@components/Avatar";
import { Header } from "@components/Header";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/Sh4rk-dev.png"
  );

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = photoSelected.assets[0].fileSize;

        if (photoInfo && photoInfo / 1024 / 1024 > 5) {
          return Alert.alert(
            "Essa imagem é muito grande.",
            "Escolha uma de até 5MB.",
            [
              {
                text: "Entendi",
              },
            ]
          );
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <Header>
        <Header.Title position={"center"} title="Minha Conta" />
      </Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={"full"}
              endColor={"gray.400"}
              startColor={"gray.600"}
            />
          ) : (
            <Avatar
              size={PHOTO_SIZE}
              alt="Imagem do usuário"
              source={{ uri: userPhoto }}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              mb={8}
              mt={2}
              fontSize={"md"}
              color={"green.500"}
              fontWeight={"bold"}
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Input
            bg={"gray.600"}
            autoCapitalize="none"
            keyboardType="default"
            placeholder="Renan Rapace"
          />

          <Input
            isDisabled
            bg={"gray.600"}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="renanrapace13@gmail.com"
          />
        </Center>

        <Center px={10} mb={9} mt={12}>
          <Text
            mb={2}
            fontSize={"md"}
            color={"gray.100"}
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
