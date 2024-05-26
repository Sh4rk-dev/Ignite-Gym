import { VStack } from "native-base";
import { Avatar } from "@components/Avatar";
import { Header } from "@components/Header";
import { HeaderIcon } from "@components/Icon";

export function Home() {
  return (
    <VStack flex={1}>
      <Header position={"start"}>
        <Avatar
          size={12}
          alt="Imagem do usuário"
          source={{ uri: "https://github.com/Sh4rk-dev.png" }}
        />
        <Header.Title title="Olá," subTitle="Renan Rapace" hasSubTitle />
        <HeaderIcon name="logout" />
      </Header>
    </VStack>
  );
}
