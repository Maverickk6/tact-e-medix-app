import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { usePatientsStore } from "../store/usePatientsStore";
import { PatientCard } from "../components/PatientCard";
import { SearchBar } from "../components/SearchBar";
import { PatientTab } from "../types/patient";

const TABS: { key: PatientTab; label: string }[] = [
  { key: "all", label: "All Patients" },
  { key: "active", label: "Active" },
  { key: "pending", label: "Pending" },
  { key: "past", label: "Past" },
];

export const PatientsScreen = () => {
  const [activeTab, setActiveTab] = useState<PatientTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { patients, isLoading, error, fetchPatients } = usePatientsStore();

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaProvider className="flex-1 bg-[#F8FAFC]">
      {/* Header */}
      <View className="px-5 py-4 border-b border-gray-100 mb-3 mt-8">
        <Text className="text-xl text-center font-poppins-bold text-gray-800">
          Patients
        </Text>
      </View>

      {/* Tab View */}

      <View className="px-5 pt-2 relative">
        <ScrollView
          horizontal
          className="flex-row"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className="mr-8 pb-3 items-center"
              style={{ minWidth: 100 }}
            >
              <Text
                className={`font-poppins-medium text-md text-center ${
                  activeTab === tab.key ? "text-primary" : "text-[#64748b]"
                }`}
              >
                {tab.label}
              </Text>
              {activeTab === tab.key && (
                <View className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full z-20" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200 z-0" />
      </View>

      {/* Content */}
      <View className="flex-1 px-5 pt-4">
        {/* Search Bar */}
        {activeTab === "all" && (
          <View className="mb-4">
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search by patient"
            />
          </View>
        )}

        {/* Loading State */}
        {isLoading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#20beb8" />
          </View>
        )}

        {/* Error State */}
        {error && (
          <View className="flex-1 items-center justify-center">
            <Text className="font-poppins text-red-500">{error}</Text>
            <TouchableOpacity
              onPress={fetchPatients}
              className="mt-4 bg-primary px-6 py-3 rounded-xl"
            >
              <Text className="font-poppins-medium text-white">Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Patient List */}
        {!isLoading && !error && (
          <FlatList
            data={activeTab === "all" ? filteredPatients : []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PatientCard patient={item} />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center py-20">
                <Text className="font-poppins text-gray-400">
                  No patients found
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaProvider>
  );
};
