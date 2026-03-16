import React from "react";
import { View, StyleSheet, Pressable, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LogoIcon from "@components/LogoIcon";
import { useTheme } from "@context/ThemeContext";

type HomeHeaderProps = {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
};

const HomeHeader: React.FC<HomeHeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "#062046",
          paddingTop: (StatusBar.currentHeight ?? 25) + 6,
        },
      ]}
    >
      <LogoIcon />
      <Pressable
        accessibilityLabel={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        onPress={onMenuToggle}
        style={({ pressed }) => [
          styles.iconButton,
          { backgroundColor: pressed ? "#ffffff20" : "transparent" },
        ]}
      >
        <MaterialCommunityIcons
          name={isMenuOpen ? "close" : "menu"}
          size={28}
          color="#fff"
        />
      </Pressable>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    height: 140,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
