import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { PatientsScreen } from "../screens/PatientsScreen";
import { ScheduleScreen } from "../screens/ScheduleScreen";
import { RecordsScreen } from "../screens/RecordsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import HomeIcon from "../assets/home-icon.svg";
import ScheduleIcon from "../assets/schedule-icon.svg";
import RecordsIcon from "../assets/records-icon.svg";
import ProfileIcon from "../assets/profile-icon.svg";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#20beb8",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#f1f5f9",
          height: 80,
          paddingBottom: 35,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins_500Medium",
          fontSize: 13,
          marginBottom: 8,
        },
        animation: "shift",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <HomeIcon width={size} height={size} color={color} />;
          } else if (route.name === "Patients") {
            return <Ionicons name="people" size={size} color={color} />;
          } else if (route.name === "Schedule") {
            return <ScheduleIcon width={size} height={size} color={color} />;
          } else if (route.name === "Records") {
            return <RecordsIcon width={size} height={size} color={color} />;
          } else if (route.name === "Profile") {
            return <ProfileIcon width={size} height={size} color={color} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Patients" component={PatientsScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Records" component={RecordsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
