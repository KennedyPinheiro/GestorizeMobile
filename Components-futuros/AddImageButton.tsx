import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface AddImageButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

const AddImageButton: React.FC<AddImageButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.text}>ADICIONAR</Text>
        <Text style={styles.text}>IMG</Text>
        <MaterialCommunityIcons
          name="download"
          size={20}
          color="#fff"
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "95%",
    maxWidth: "80%",
    backgroundColor:'#26579E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6, // Se estiver usando RN < 0.73, troque por margin
  },
  text: {
    fontSize: 18,
    fontWeight: "900",
    color: "#fff",
    fontFamily: "Inter",
  },
  icon: {
    marginLeft: 4,
  },
});

export default AddImageButton;
