import React, { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Image as ExpoImage } from "expo-image";

const ScanPage = () => {
  const [libraryPermission, requestLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    let chosenImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(chosenImage);
    if (!chosenImage.canceled) {
      setSelectedImage(chosenImage.assets[0].uri);
    }
  };

  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function clearImage() {
    setSelectedImage(null);
  }

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <View>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      ) : (
        <ExpoImage
          style={{
            width: 200,
            height: 200,
            borderColor: "black",
            borderWidth: 1,
          }}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Ionicons name="camera" size={50} color="black" />
        <Text>Take photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={clearImage}
        disabled={!selectedImage}
      >
        <Ionicons name="trash" size={50} color="black" />
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  button: {
    width: 320,
    height: 68,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 3,
  },
  image: {
    width: 200,
    height: 200,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
});

export default ScanPage;
