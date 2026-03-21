import React, { useState, useRef } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface InputLoginProps {
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  icon?: keyof typeof Ionicons.glyphMap
}

export default function InputLogin({
  placeholder = 'Digite...',
  value,
  onChangeText,
  secureTextEntry = false,
  icon = 'mail-outline'
}: InputLoginProps) {
  const [isSecure, setIsSecure] = useState(secureTextEntry)
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef<TextInput>(null)

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
        inputRef.current?.blur()
        setIsFocused(false)
      }}
    >
      <View
        style={[
          styles.container,
          isFocused && styles.containerFocused
        ]}
      >
        <Ionicons
          name={icon}
          size={24}
          color={isFocused ? '#6C63FF' : '#1E1E1E'}
        />

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          underlineColorAndroid="transparent"
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={isFocused ? '#6C63FF' : '#1E1E1E'}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 64,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  containerFocused: {
    borderColor: '#6C63FF',
    backgroundColor: '#F5F4FF',
  },

  input: {
    flex: 1,
    marginHorizontal: 10,
    color: '#000',
    fontSize: 20,
  },
})