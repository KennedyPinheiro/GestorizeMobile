import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type SelectProps = {
  value: string; 
  onChange: (value: string) => void; 
  label?: string;
  placeholder?: string;
  size?: "small" | "medium";
  children: React.ReactNode;
};

type MenuItemProps = {
  value: string; 
  children: React.ReactNode;
  onPress?: () => void;
};

const { height } = Dimensions.get("window");

const Select = ({
  value,
  onChange,
  label = "Selecione",
  placeholder = "Selecione...",
  size = "medium",
  children,
}: SelectProps) => {
  const [visible, setVisible] = useState(false);

  const selectedLabel = React.Children.toArray(children).find(
    (child): child is React.ReactElement<MenuItemProps> =>
      React.isValidElement(child) && child.props.value === value
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setVisible(false);
  };

  const renderChildren = () =>
    React.Children.map(children, (child): React.ReactElement | null => {
      if (React.isValidElement<MenuItemProps>(child)) {
        return React.cloneElement(child, {
          onPress: () => handleSelect(child.props.value),
        });
      }
      return null;
    });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[styles.selectBox, size === "small" && { height: height * 0.06 }]}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.selectText, !value && styles.placeholder]}>
          {selectedLabel?.props?.children || placeholder}
        </Text>
        <MaterialIcons 
          name="keyboard-arrow-down" 
          size={24} 
          color="#fff" 
          style={styles.icon}
        />
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <ScrollView>{renderChildren()}</ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: "110%",
    height: height * 0.08,
    backgroundColor: "#7294CA",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    color: "#ffffffc0",
    fontWeight: "600",
    marginTop:9,
  },
  selectBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    flex: 1,
  },
  placeholder: {
    color: "#cccccc9d",
  },
  icon: {
    marginLeft: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "#00000050",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    maxHeight: "50%",
  },
});


const MenuItem = ({ value, children, onPress }: MenuItemProps) => (
  <TouchableOpacity onPress={onPress} style={menuStyles.menuItem}>
    <Text style={menuStyles.menuItemText}>{children}</Text>
  </TouchableOpacity>
);

const menuStyles = StyleSheet.create({
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
});

export { Select, MenuItem };