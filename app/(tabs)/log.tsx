import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useFoodStore } from "@/store/food-store";
import { MealSection } from "@/components/MealSection";
import { DailySummary } from "@/components/DailySummary";
import { colors } from "@/constants/colors";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

export default function LogScreen() {
  const { foods, entries } = useFoodStore();
  
  // State to track the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Format date as YYYY-MM-DD for filtering entries
  const dateString = selectedDate.toISOString().split("T")[0];
  const dateEntries = entries.filter((entry) => entry.date === dateString);
  
  // Format date for display
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  
  const goToPreviousDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };
  
  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    // Don't allow selecting future dates
    if (nextDay <= new Date()) {
      setSelectedDate(nextDay);
    }
  };
  
  const isToday = () => {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.dateSelector}>
        <Pressable 
          style={({ pressed }) => [
            styles.dateButton,
            pressed && styles.pressed,
          ]}
          onPress={goToPreviousDay}
        >
          <ChevronLeft size={24} color={colors.text} />
        </Pressable>
        
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          {isToday() && <Text style={styles.todayBadge}>Today</Text>}
        </View>
        
        <Pressable 
          style={({ pressed }) => [
            styles.dateButton,
            pressed && styles.pressed,
            // Disable next button if already on today
            isToday() && styles.disabledButton,
          ]}
          onPress={goToNextDay}
          disabled={isToday()}
        >
          <ChevronRight size={24} color={isToday() ? colors.textSecondary : colors.text} />
        </Pressable>
      </View>
      
      <DailySummary date={dateString} />
      
      <View style={styles.mealsContainer}>
        <Text style={styles.sectionTitle}>Meals</Text>
        
        <MealSection
          title="Breakfast"
          mealType="breakfast"
          entries={dateEntries}
          foods={foods}
        />
        
        <MealSection
          title="Lunch"
          mealType="lunch"
          entries={dateEntries}
          foods={foods}
        />
        
        <MealSection
          title="Dinner"
          mealType="dinner"
          entries={dateEntries}
          foods={foods}
        />
        
        <MealSection
          title="Snacks"
          mealType="snack"
          entries={dateEntries}
          foods={foods}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.card,
  },
  disabledButton: {
    backgroundColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  dateContainer: {
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  todayBadge: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "500",
    marginTop: 2,
  },
  mealsContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
});