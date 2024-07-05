import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Center, Skeleton, Text, VStack, useToast } from "native-base";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Controller, useForm } from "react-hook-form";

import * as ImagePicker from "expo-image-picker";

import { Input } from "@components/Input";
import { Avatar } from "@components/Avatar";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";

const PHOTO_SIZE = 33;

const schemaProfileForm = z
  .object({
    name: z.string().min(3, { message: "Digite um nome válido" }).trim(),
    email: z.string(),
    old_password: z.string().trim().optional(),
    password: z.string().trim().optional(),
    confirm_Password: z.string().trim().optional(),
  })
  .refine((data) => data.confirm_Password === data.password, {
    message: "A confirmação de senha não confere.",
    path: ["confirm_Password"],
  });
type FormProfileValidation = z.infer<typeof schemaProfileForm>;

export function Profile() {
  const [buttonEditIsActive, setButtonEditIsActive] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/Sh4rk-dev.png"
  );

  const Toast = useToast();
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProfileValidation>({
    resolver: zodResolver(schemaProfileForm),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

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
          return Toast.show({
            paddingY: 3,
            placement: "top",
            bgColor: "red.500",
            title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
          });
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormProfileValidation) {
    try {
      console.log(data);

      setIsUpdating(true);

      await api.put("/users", data);

      Toast.show({
        paddingY: 3,
        placement: "top",
        bgColor: "green.500",
        title: "Perfil atualizado com sucesso!",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar os dados. Tente novamente mais tarde!";
      Toast.show({
        paddingY: 3,
        placement: "top",
        bgColor: "red.500",
        title,
      });
    } finally {
      setIsUpdating(false);
      setButtonEditIsActive(true);
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

          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                bg={"gray.600"}
                placeholder="Nome"
                onChangeText={onChange}
                isDisabled={buttonEditIsActive}
                isReadOnly={buttonEditIsActive}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value } }) => (
              <Input
                isDisabled
                isReadOnly
                value={value}
                bg={"gray.600"}
                placeholder="E-mail"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
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

          <Controller
            name="old_password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                secureTextEntry
                bg={"gray.600"}
                autoCapitalize="none"
                onChangeText={onChange}
                isDisabled={buttonEditIsActive}
                isReadOnly={buttonEditIsActive}
                placeholder="Digite a senha antiga..."
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                secureTextEntry
                bg={"gray.600"}
                autoCapitalize="none"
                onChangeText={onChange}
                isDisabled={buttonEditIsActive}
                isReadOnly={buttonEditIsActive}
                errorMessage={errors.password?.message}
                placeholder="Digite a nova senha..."
              />
            )}
          />

          <Controller
            name="confirm_Password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                secureTextEntry
                bg={"gray.600"}
                autoCapitalize="none"
                onChangeText={onChange}
                isDisabled={buttonEditIsActive}
                isReadOnly={buttonEditIsActive}
                placeholder="Confirme a nova senha..."
                errorMessage={errors.confirm_Password?.message}
              />
            )}
          />

          {buttonEditIsActive ? (
            <Button
              isLoading={isUpdating}
              onPress={() => setButtonEditIsActive((prev) => !prev)}
              title="Editar"
              mt={6}
            />
          ) : (
            <Button
              isLoading={isUpdating}
              onPress={handleSubmit(handleProfileUpdate)}
              title="Atualizar"
              mt={6}
            />
          )}
        </Center>
      </ScrollView>
    </VStack>
  );
}
