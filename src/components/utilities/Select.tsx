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
  DimensionValue,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  onOpen?: () => void;
  label?: string;
  placeholder?: string;
  children: React.ReactNode;
  width?: DimensionValue;
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
  onOpen,
  label = "Campo",
  placeholder = "Selecionar...",
  children,
  width = "100%",
}: SelectProps) => {
  const [visible, setVisible] = useState(false);

  const selectedLabel = React.Children.toArray(children).find(
    (child): child is React.ReactElement<MenuItemProps> =>
      React.isValidElement<MenuItemProps>(child) && child.props.value === value
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

  const isEmpty = !value;

  return (
    <TouchableOpacity
      onPress={() => {
        setVisible(true);
        if (onOpen) onOpen(); // <-- Chama carregarRoles ao abrir
      }}
      activeOpacity={0.7}
    >
      <View style={[styles.container, { width }]}>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.valueText, isEmpty && styles.placeholderText]}>
              {value || placeholder}
            </Text>
          </View>
          <MaterialIcons name="arrow-drop-down" size={28} color="#666" />
        </View>

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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 13,
    color: "#6e6e6e",
    fontWeight: "bold",
    marginBottom: 5,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  valueText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
    flex: 1,
  },
  placeholderText: {
    color: "#999",
    fontWeight: "normal",
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemText: {
    fontSize: 20,
    color: "#333",
  },
});

export { Select, MenuItem };
