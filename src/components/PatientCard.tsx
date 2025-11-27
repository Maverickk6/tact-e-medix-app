import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Patient } from "../types/patient";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const [expanded, setExpanded] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
        <View className="flex-row items-center mb-1">
          <Image
            source={{ uri: patient.image }}
            className="w-14 h-14 rounded-full"
          />
          <View className="flex-1 ml-3">
            <Text className="font-poppins-medium text-gray-800 text-[14.5px]">
              {patient.name}
            </Text>
            <View className="flex-row items-center gap-[0.5px]">
              <Text className="text-md font-poppins text-[#64748B]">
                {patient.gender}
              </Text>
              <Text className="text-[6px] mx-2 text-[#64748B]">⬤</Text>
              <Text className="text-md font-poppins text-[#64748B]">
                Age: {patient.age}
              </Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.9} onPress={toggleExpand}>
            <Ionicons
              name={expanded ? "chevron-down" : "chevron-forward"}
              size={22}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>

        {expanded && (
          <View className="mt-4 pt-4 border-t border-gray-100">
            {/* Dates Row */}
            <View className="flex-row justify-between mb-4">
              <View className="bg-gray-50 p-3 rounded-xl flex-1 mr-2">
                <View className="flex-row items-center mb-1">
                  <Ionicons name="calendar-outline" size={14} color="#20beb8" />
                  <Text className="text-xs font-poppins text-gray-500 ml-1">
                    Last appointment
                  </Text>
                </View>
                <Text className="font-poppins-medium text-gray-800">
                  {formatDate(patient.lastAppointment)}
                </Text>
              </View>
              <View className="bg-gray-50 p-3 rounded-xl flex-1 ml-2">
                <View className="flex-row items-center mb-1">
                  <Ionicons name="time-outline" size={14} color="#20beb8" />
                  <Text className="text-xs font-poppins text-gray-500 ml-1">
                    Upcoming
                  </Text>
                </View>
                <Text className="font-poppins-medium text-gray-800">
                  {formatDate(patient.upcomingAppointment)}
                </Text>
              </View>
            </View>

            {/* Contact Info */}
            <View className="mb-4">
              <Text className="text-sm font-poppins-medium text-gray-800 mb-2">
                Contact Information
              </Text>
              <View className="flex-row items-center mb-2 gap-3">
                <Ionicons name="call-outline" size={17} color="#94a3b8" />
                <Text className="font-poppins text-gray-600">
                  {patient.contact.phone}
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Ionicons name="mail-outline" size={17} color="#94a3b8" />

                <Text className="font-poppins text-gray-600">
                  {patient.contact.email}
                </Text>
              </View>
            </View>

            {/* Consultation Notes Button */}

            <View className="flex-row justify-between">
              <View className="py-1 px-3 border border-[#20beb8] rounded-3xl items-center justify-center min-w-[140px]">
                <Text className="font-poppins-medium text-[#20beb8]">
                  View profile
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowNotes(true)}
                className="bg-[#20beb8] border-gray-200 px-3 py-1 rounded-3xl flex-row items-center justify-between"
              >
                <View className="flex-row items-center px-3">
                  <Text className="font-poppins-medium text-white">
                    Consultation Notes
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Consultation Notes Modal */}
      <Modal
        visible={showNotes}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotes(false)}
      >
        <TouchableOpacity
          className="flex-1 justify-end bg-black/50"
          activeOpacity={1}
          onPress={() => setShowNotes(false)}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View className="bg-[#F8FAFC] rounded-t-3xl h-[85%]">
              <View className="p-5 border-b border-gray-100 flex-row justify-center items-center">
                <Text className="text-lg font-poppins-medium text-black">
                  Consultation Notes
                </Text>
              </View>

              <ScrollView className="flex-1 p-5">
                {patient.consultationNotes &&
                patient.consultationNotes.length > 0 ? (
                  patient.consultationNotes.map((note, index) => (
                    <View key={index} className="bg-white rounded-xl p-4 mb-4">
                      <View className="flex-row justify-between items-start mb-2">
                        <Text className="text-lg font-poppins-bold text-gray-800 flex-1 mr-2">
                          {note.title}
                        </Text>
                      </View>
                      <Text className="font-poppins text-gray-600 leading-5 mb-4">
                        {note.description}
                      </Text>
                      <View className="flex-row items-center gap-3 mb-2">
                        <Ionicons
                          name="calendar-outline"
                          size={16}
                          color="#009aff"
                        />
                        <Text className="font-poppins text-gray-600">
                          {note.date}
                        </Text>
                      </View>
                      <TouchableOpacity className="w-full border border-[#20beb8] rounded-3xl py-1 items-center">
                        <Text className="font-poppins-medium text-[#20beb8]">
                          View Full Note
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <View className="items-center justify-center py-20">
                    <View className="w-16 h-16 bg-gray-50 rounded-full items-center justify-center mb-4">
                      <Ionicons
                        name="document-text-outline"
                        size={32}
                        color="#CBD5E1"
                      />
                    </View>
                    <Text className="font-poppins-medium text-gray-500 text-lg">
                      No notes available
                    </Text>
                    <Text className="font-poppins text-gray-400 text-center mt-2 px-10">
                      There are no consultation notes recorded for this patient
                      yet.
                    </Text>
                  </View>
                )}
                <View className="h-10" />
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
