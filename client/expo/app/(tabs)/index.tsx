import { StyleSheet, Text, View } from "react-native";
import { trpc } from "../../../api/trpc";

export default function Index() {
  // const user = await trpc.userById.query("1");
  // const createdUser = await trpc.createUser.mutate({
  //   name: "Alice",
  //   email: "alice@trpc.io",
  // });

  // LOG  {"createdUser": {"_h": 0, "_i": 0, "_j": null, "_k": null}, "user": {"_h": 0, "_i": 0, "_j": null, "_k": null}}

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>bill-splitter</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>user</Text>
        <Text style={styles.text}>createdUser</Text>
      </View>
    </>
  );
}

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
