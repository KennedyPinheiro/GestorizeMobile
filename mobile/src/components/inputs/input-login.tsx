import React, { useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
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

  return (
    <View style={styles.container}>
      
      <Ionicons name={icon} size={24} color="#1E1E1E" />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#1E1E1E"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />

      {secureTextEntry && (
        <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
          <Ionicons
            name={isSecure ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#1E1E1E"
          />
        </TouchableOpacity>
      )}
    </View>
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
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    color: '#000',
    fontSize: 20,
  },
})