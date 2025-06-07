import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { useFoodStore } from "@/store/food-store";
import { colors } from "@/constants/colors";
import { Settings, User, Bell, Moon, Info, ChevronRight } from "lucide-react-native";

export default function ProfileScreen() {
  const { userSettings, updateUserSettings } = useFoodStore();
  const [isEditing, setIsEditing] = useState(false);
  const [calorieGoal, setCalorieGoal] = useState(userSettings.calorieGoal.toString());
  const [proteinGoal, setProteinGoal] = useState(userSettings.proteinGoal.toString());
  const [carbsGoal, setCarbsGoal] = useState(userSettings.carbsGoal.toString());
  const [fatGoal, setFatGoal] = useState(userSettings.fatGoal.toString());
  
  // Mock settings
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  const handleSaveGoals = () => {
    const newSettings = {
      calorieGoal: parseInt(calorieGoal) || 2000,
      proteinGoal: parseInt(proteinGoal) || 150,
      carbsGoal: parseInt(carbsGoal) || 200,
      fatGoal: parseInt(fatGoal) || 65,
    };
    
    updateUserSettings(newSettings);
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    // Reset to current values
    setCalorieGoal(userSettings.calorieGoal.toString());
    setProteinGoal(userSettings.proteinGoal.toString());
    setCarbsGoal(userSettings.carbsGoal.toString());
    setFatGoal(userSettings.fatGoal.toString());
    setIsEditing(false);
  };
  
  const showAboutAlert = () => {
    Alert.alert(
      "About Calorie Tracker",
      "Version 1.0.0\nA simple app to track your daily nutrition.",
      [{ text: "OK" }]
    );
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <User size={40} color={colors.background} />
        </View>
        <Text style={styles.username}>User</Text>
        <Text style={styles.subtitle}>Calorie Tracker</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Settings size={18} color={colors.text} />
          <Text style={styles.sectionTitle}>Nutrition Goals</Text>
        </View>
        
        {isEditing ? (
          <View style={styles.editContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Daily Calories:</Text>
              <TextInput
                style={styles.input}
                value={calorieGoal}
                onChangeText={setCalorieGoal}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Protein (g):</Text>
              <TextInput
                style={styles.input}
                value={proteinGoal}
                onChangeText={setProteinGoal}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Carbs (g):</Text>
              <TextInput
                style={styles.input}
                value={carbsGoal}
                onChangeText={setCarbsGoal}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Fat (g):</Text>
              <TextInput
                style={styles.input}
                value={fatGoal}
                onChangeText={setFatGoal}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.buttonRow}>
              <Pressable 
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancelEdit}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveGoals}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.goalRow}>
              <Text style={styles.goalLabel}>Daily Calories</Text>
              <Text style={styles.goalValue}>{userSettings.calorieGoal}</Text>
            </View>
            
            <View style={styles.goalRow}>
              <Text style={styles.goalLabel}>Protein</Text>
              <Text style={styles.goalValue}>{userSettings.proteinGoal}g</Text>
            </View>
            
            <View style={styles.goalRow}>
              <Text style={styles.goalLabel}>Carbs</Text>
              <Text style={styles.goalValue}>{userSettings.carbsGoal}g</Text>
            </View>
            
            <View style={styles.goalRow}>
              <Text style={styles.goalLabel}>Fat</Text>
              <Text style={styles.goalValue}>{userSettings.fatGoal}g</Text>
            </View>
            
            <Pressable 
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>Edit Goals</Text>
            </Pressable>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Settings size={18} color={colors.text} />
          <Text style={styles.sectionTitle}>App Settings</Text>
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Bell size={18} color={colors.text} />
            <Text style={styles.settingLabel}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.background}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Moon size={18} color={colors.text} />
            <Text style={styles.settingLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.background}
          />
        </View>
        
        <Pressable 
          style={styles.settingRow}
          onPress={showAboutAlert}
        >
          <View style={styles.settingLabelContainer}>
            <Info size={18} color={colors.text} />
            <Text style={styles.settingLabel}>About</Text>
          </View>
          <ChevronRight size={18} color={colors.textSecondary} />
        </Pressable>
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
  header: {
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  goalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  goalLabel: {
    fontSize: 16,
    color: colors.text,
  },
  goalValue: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
  },
  editButton: {
    alignSelf: "center",
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  editButtonText: {
    color: colors.background,
    fontWeight: "500",
  },
  editContainer: {
    gap: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: 16,
    color: colors.text,
  },
  input: {
    width: 100,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    fontSize: 16,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: colors.border,
  },
  cancelButtonText: {
    color: colors.text,
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    color: colors.background,
    fontWeight: "500",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
  },
});