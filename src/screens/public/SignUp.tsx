import { useState } from "react";
import { Image } from "react-native";
import { Center, Heading, ScrollView, Text, VStack } from "native-base";

import { useForm, Controller } from "react-hook-form";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

interface IFormDataProps {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export function SignUp() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormDataProps>();

  const navigation = useNavigation();

  function handleSignUp(data: IFormDataProps) {
    return console.log(data);
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={8}>
        <Image
          resizeMode="cover"
          alt="Pessoas treinando"
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          style={{ position: "absolute" }}
        />

        <Center my={24}>
          <LogoSvg />
          <Text color={"gray.100"} fontSize={"sm"}>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            mb={6}
            fontSize={"xl"}
            color={"gray.100"}
            fontFamily={"heading"}
          >
            Crie sua conta
          </Heading>

          <Controller
            name="name"
            control={control}
            rules={{
              required: "Informe o nome.",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                value={value}
                placeholder="Nome"
                onChangeText={onChange}
                label={errors.name?.message}
                {...register("name")}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Informe o seu E-mail.",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="E-mail"
                autoCapitalize="none"
                onChangeText={onChange}
                keyboardType="email-address"
                label={errors.email?.message}
                {...register("email")}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Digite a sua senha.",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                secureTextEntry
                placeholder="Senha"
                autoCapitalize="none"
                onChangeText={onChange}
                label={errors.password?.message}
                {...register("password")}
              />
            )}
          />

          <Controller
            name="password_confirm"
            control={control}
            rules={{
              required: "Confirme a sua senha.",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                secureTextEntry
                returnKeyType="send"
                autoCapitalize="none"
                onChangeText={onChange}
                placeholder="Confirme a Senha"
                label={errors.password_confirm?.message}
                onSubmitEditing={handleSubmit(handleSignUp)}
                {...register("password_confirm")}
              />
            )}
          />

          <Button
            onPress={handleSubmit(handleSignUp)}
            title="Criar e acessar"
          />
        </Center>

        <Button
          mt={12}
          variant={"outline"}
          onPress={handleGoBack}
          title="Voltar para o login"
        />
      </VStack>
    </ScrollView>
  );
}
