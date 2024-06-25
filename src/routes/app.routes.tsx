import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Exercise } from "@screens/private/Exercise";
import { History } from "@screens/private/History";
import { Home } from "@screens/private/Home";
import { Profile } from "@screens/private/Profile";

import HistorySvg from "@assets/history.svg";
import HomeSvg from "@assets/home.svg";
import ProfileSvg from "@assets/profile.svg";

import { useTheme } from "native-base";
import { Platform } from "react-native";

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: { exerciseId: string };
};

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export type AppNavigationTabsRoutesProps = BottomTabNavigationProp<AppRoutes>;

export function AppRoutes() {
  const { colors, sizes } = useTheme();
  const sizeSvg = sizes[7];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[300],

        tabBarStyle: {
          marginBottom: 20,
          borderRadius: 15,
          marginHorizontal: 20,
          position: "relative",
          borderColor: colors.gray[700],
          backgroundColor: colors.gray[600],
          height: Platform.OS === "android" ? 64 : 96,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return <HomeSvg width={sizeSvg} height={sizeSvg} fill={color} />;
          },
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => {
            return <HistorySvg width={sizeSvg} height={sizeSvg} fill={color} />;
          },
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => {
            return <ProfileSvg width={sizeSvg} height={sizeSvg} fill={color} />;
          },
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
