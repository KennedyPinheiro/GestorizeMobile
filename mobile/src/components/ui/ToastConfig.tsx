import React from 'react';
import { StyleSheet } from 'react-native';
import Toast, { BaseToast, ToastShowParams } from 'react-native-toast-message';

interface ToastProps {
  text1?: string;
  text2?: string;
  [key: string]: any;
}

const toastConfig = {
  success: ({ text1, text2, ...rest }: ToastProps) => (
    <BaseToast
      {...rest}
      style={[styles.toast, styles.success]}
      contentContainerStyle={styles.content}
      text1={text1}
      text2={text2}
    />
  ),
  error: ({ text1, text2, ...rest }: ToastProps) => (
    <BaseToast
      {...rest}
      style={[styles.toast, styles.error]}
      contentContainerStyle={styles.content}
      text1={text1}
      text2={text2}
    />
  ),
  info: ({ text1, text2, ...rest }: ToastProps) => (
    <BaseToast
      {...rest}
      style={[styles.toast, styles.info]}
      contentContainerStyle={styles.content}
      text1={text1}
      text2={text2}
    />
  ),
};

const styles = StyleSheet.create({
  toast: {
    borderLeftWidth: 5,
    marginTop: 10,
    marginRight: 10,
    alignSelf: 'flex-end',
    width: '40%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    paddingHorizontal: 15,
  },
  success: {
    borderLeftColor: '#4CAF50',
    backgroundColor: '#E6F4EA',
  },
  error: {
    borderLeftColor: '#F44336',
    backgroundColor: '#FDECEA',
  },
  info: {
    borderLeftColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
});

export default toastConfig;
