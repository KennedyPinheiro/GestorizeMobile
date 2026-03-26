import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, Dimensions } from 'react-native';

type AlertType = 'success' | 'error' | 'warning' | 'info';

type SidebarAlertProps = {
  message: string;
  visible: boolean;
  type?: AlertType;
  onClose?: () => void;
  duration?: number;
};

const SidebarAlert = ({
  message,
  visible,
  type = 'info',
  onClose,
  duration = 3000,
}: SidebarAlertProps) => {
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').width),
  ).current;
  const [isVisible, setIsVisible] = useState(visible);

  const alertConfig = {
    success: {
      icon: '✅',
      backgroundColor: '#28a745',
      textColor: '#fff',
    },
    error: {
      icon: '❌',
      backgroundColor: '#dc3545',
      textColor: '#fff',
    },
    warning: {
      icon: '⚠️',
      backgroundColor: '#ffc107',
      textColor: '#000',
    },
    info: {
      icon: 'ℹ️',
      backgroundColor: '#17a2b8',
      textColor: '#fff',
    },
  };

  const currentConfig = alertConfig[type];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (visible) {
      setIsVisible(true);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: Dimensions.get('window').width,
          duration: 500,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          if (onClose) onClose();
          setIsVisible(false);
        }, 500);
      }, duration);
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => setIsVisible(false), 50);
      });
    }

    return () => clearTimeout(timer);
  }, [visible]);

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: slideAnim }],
          backgroundColor: currentConfig.backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          { color: currentConfig.textColor },
          { color: currentConfig.textColor || '#fff' },
        ]}
      >
        {currentConfig.icon} {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 80,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    maxWidth: '80%',
    zIndex: 1000,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SidebarAlert;
