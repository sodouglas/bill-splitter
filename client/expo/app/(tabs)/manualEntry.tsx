import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

interface Order {
  name: string;
  price: number;
}

const ManualEntryPage = () => {
  const [diners, setDiners] = useState<string[]>([]);
  const [diner, setDiner] = useState("");
  const dinerCount = diners.length;

  const [orderList, setOrderList] = useState<Order[]>([]);
  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Who's eating?</Text>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Enter a name"
            value={diner}
            onChangeText={setDiner}
          />
          <Button
            title="Add Participant"
            onPress={() => {
              if (diner.trim()) {
                setDiners([...diners, diner]);
                setDiner("");
              }
            }}
          />
        </View>
      </View>
      <View>
        {diners.map((participant, index) => (
          <Text key={index}>&bull; {participant}</Text>
        ))}
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.heading}>What did you guys order?</Text>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Enter a dish"
            value={dishName}
            onChangeText={setDishName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter a price"
            value={dishPrice}
            onChangeText={setDishPrice}
            keyboardType="numeric"
          />
          <Button
            title="Add to Order"
            onPress={() => {
              if (dishName.trim() && parseFloat(dishPrice)) {
                const newOrder: Order = {
                  name: dishName,
                  price: parseFloat(dishPrice) / dinerCount,
                };
                setOrderList([newOrder, ...orderList]);
                // reset input fields
                setDishName("");
                setDishPrice("");
              }
            }}
          />
        </View>
        <View>
          {orderList.map((order, index) => (
            <Text key={index}>
              &bull; {order.name}, ${order.price}
            </Text>
          ))}
        </View>
        <Button
          title="Clear Orders"
          color="red"
          onPress={() => {
            setOrderList([]);
          }}
        />
        <Button
          title="Clear Participants"
          color="red"
          onPress={() => {
            setDiners([]);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    marginHorizontal: 10,
    fontSize: 24,
  },
  orderContainer: {},
  textInput: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default ManualEntryPage;
