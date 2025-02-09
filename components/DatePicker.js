import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import moment from "moment";

const DatePicker = ({ visible, onClose, onSelectDate }) => {
  const [selectedDay, setSelectedDay] = useState(moment().date());
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());

  const futureYears = Array.from({ length: 10 }, (_, i) => moment().year() + i);
  const months = moment.months();
  const daysInMonth = moment(`${selectedYear}-${selectedMonth + 1}`, "YYYY-MM").daysInMonth();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleConfirm = () => {
    const selectedDate = moment({ year: selectedYear, month: selectedMonth, day: selectedDay }).format("YYYY-MM-DD");
    onSelectDate(selectedDate);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.title}>Select Date</Text>
          <View style={styles.pickerRow}>
            {/* Day Picker */}
            <FlatList
              data={days}
              keyExtractor={(item) => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedDay(item)}>
                  <Text style={[styles.pickerItem, selectedDay === item && styles.selectedItem]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            {/* Month Picker */}
            <FlatList
              data={months}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => setSelectedMonth(index)}>
                  <Text style={[styles.pickerItem, selectedMonth === index && styles.selectedItem]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            {/* Year Picker */}
            <FlatList
              data={futureYears}
              keyExtractor={(item) => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedYear(item)}>
                  <Text style={[styles.pickerItem, selectedYear === item && styles.selectedItem]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  pickerContainer: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  pickerRow: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  pickerItem: { fontSize: 16, padding: 10, color: "gray" },
  selectedItem: { color: "black", fontWeight: "bold" },
  confirmButton: { marginTop: 20, backgroundColor: "#2196F3", padding: 10, borderRadius: 5 },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default DatePicker;

