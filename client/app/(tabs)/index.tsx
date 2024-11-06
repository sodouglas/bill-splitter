import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default function Index() {
  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <Text style={styles.text}>bill-splitter</Text>
      </View>
    </ActionSheetProvider>
  );
}
