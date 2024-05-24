import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "@screens/private/Home";
import { History } from "@screens/private/History";
import { Profile } from "@screens/private/Profile";
import { Exercise } from "@screens/private/Exercise";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
      <Screen name="History" component={History} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Exercise" component={Exercise} />
    </Navigator>
  );
}
