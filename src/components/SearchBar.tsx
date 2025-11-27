import React from "react";
import { View, TextInput } from "react-native";
import SearchIcon from "../assets/search-icon.svg";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search",
}) => {
  return (
    <View className="flex-row items-center bg-white rounded-[8px] px-3 py-1 border border-[#CBD5E1]">
      <SearchIcon width={20} height={20} color="#64748b" />
      <TextInput
        className="flex-1 ml-1 font-poppins text-[14px] text-gray-800"
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
