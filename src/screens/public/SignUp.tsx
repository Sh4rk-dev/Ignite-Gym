import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Image } from "react-native";
import { Center, Heading, ScrollView, Text, Toast, VStack } from "native-base";

import { api } from "@services/api";

import { AppError } from "@utils/AppError";

import { useForm, Controller } from "react-hook-form";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

const FormSchemaValidation = z
  .object({
    name: z
      .string({ message: "Esse campo é obrigatório" })
      .min(1, "Digite um nome válido"),
    email: z
      .string({ message: "Esse campo é obrigatório" })
      .email("Digite um e-mail inválido"),
    password: z
      .string({ message: "Esse campo é obrigatório" })
      .min(6, "A senha deve ter pelo menos  6 dígitos"),
    password_confirm: z
      .string({ message: "Esse campo é obrigatório" })
      .min(6, "Confirme a senha"),
  })
  .refine((data) => data.password_confirm === data.password, {
    message: "As senhas não coincidem",
    path: ["password_confirm"],
  });

type FormValidation = z.infer<typeof FormSchemaValidation>;

export function SignUp() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValidation>({
    resolver: zodResolver(FormSchemaValidation),
  });

  const navigation = useNavigation();

  async function handleSignUp({ name, email, password }: FormValidation) {
    try {
      const response = await api.post("/users", { name, email, password });
      console.log(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde";

      return Toast.show({
        title,
        paddingY: 3,
        placement: "top",
        bgColor: "red.500",
      });
    }
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
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                value={value}
                placeholder="Nome"
                onChangeText={onChange}
                errorMessage={errors.name?.message}
                {...register("name")}
              />
            )}
          />

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

          <Controller
            name="password_confirm"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                secureTextEntry
                returnKeyType="send"
                autoCapitalize="none"
                onChangeText={onChange}
                placeholder="Confirme a Senha"
                errorMessage={errors.password_confirm?.message}
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
          my={12}
          variant={"outline"}
          onPress={handleGoBack}
          title="Voltar para o login"
        />
      </VStack>
    </ScrollView>
  );
}
