import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, Dimensions } from "react-native";

type ErrorSidebarAlertProps = {
  message: string;
  visible: boolean;
  onClose?: () => void;
};

const ErrorSidebarAlert = ({
  message,
  visible,
  onClose,
}: ErrorSidebarAlertProps) => {
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("window").width)
  ).current;
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: Dimensions.get("window").width,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setIsVisible(false);
          if (onClose) onClose();
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <Text style={styles.text}>⚠️ {message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    top: 80,
    backgroundColor: "#dc3545",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    maxWidth: "80%",
    zIndex: 1000,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ErrorSidebarAlert;
