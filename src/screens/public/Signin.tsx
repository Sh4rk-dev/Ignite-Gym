import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@hooks/useAuth";

import { AppError } from "@utils/AppError";

import { Controller, useForm } from "react-hook-form";

import { Image } from "react-native";
import { Center, Heading, ScrollView, Text, Toast, VStack } from "native-base";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

const schemaSingInForm = z.object({
  email: z
    .string({ message: "Campo obrigatório" })
    .email("E-mail está inválido"),
  password: z.string({ message: "Campo obrigatório" }),
});

type FormSigInValidation = z.infer<typeof schemaSingInForm>;

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSigInValidation>({
    resolver: zodResolver(schemaSingInForm),
  });

  function handleNeAccount() {
    navigation.navigate("singUp");
  }

  async function handleLoginAccount({ email, password }: FormSigInValidation) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde!";

      setIsLoading(false);
      Toast.show({
        title,
        paddingY: 3,
        placement: "top",
        bgColor: "red.500",
      });
    }
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
            Acesse a sua conta
          </Heading>

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="E-mail"
                autoCapitalize="none"
                onChangeText={onChange}
                keyboardType="email-address"
                errorMessage={errors.email?.message}
                {...register("email")}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                secureTextEntry
                placeholder="Senha"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                {...register("password")}
              />
            )}
          />

          <Button
            title="Acessar"
            onPress={handleSubmit(handleLoginAccount)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={"40"}>
          <Text color={"gray.100"} fontSize={"sm"} mb={3} fontFamily={"body"}>
            Ainda não tem acesso?
          </Text>

          <Button
            onPress={handleNeAccount}
            title="Criar conta"
            variant={"outline"}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
