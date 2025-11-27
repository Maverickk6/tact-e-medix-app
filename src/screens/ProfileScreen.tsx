import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-2xl font-poppins-bold text-primary">Profile</Text>
      <Text className="text-base font-poppins text-secondary">
        User settings and info
      </Text>
    </SafeAreaView>
  );
};
