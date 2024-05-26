import { Header } from "@components/Header";
import { VStack } from "native-base";

export function Profile() {
  return (
    <VStack flex={1}>
      <Header>
        <Header.Title position={"center"} title="Perfil" />
      </Header>
    </VStack>
  );
}
