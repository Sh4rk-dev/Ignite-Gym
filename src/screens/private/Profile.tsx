import { Header } from "@components/Header";
import { VStack } from "native-base";

export function Profile() {
  return (
    <VStack flex={1}>
      <Header position="center">
        <Header.Title title="Perfil" />
      </Header>
    </VStack>
  );
}
