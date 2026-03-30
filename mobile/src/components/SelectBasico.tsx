// SelectBasico.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';

type Option = {
  label: string;
  value: string;
};

type SelectBasicoProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  data?: Option[];
  backgroundColor?: string;
  textColor?: string;
  labelColor?: string;
  placeholder?: string; // Nova prop placeholder
};

const SelectBasico = ({
  label = 'Campo',
  value,
  onChange,
  data = [],
  backgroundColor,
  textColor,
  labelColor,
  placeholder, // Nova prop
}: SelectBasicoProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, isDark } = useTheme();

  const finalBackgroundColor = backgroundColor || colors.surface;
  const finalTextColor = textColor || colors.text;
  const finalLabelColor = labelColor || colors.muted;

  // Usa o placeholder se fornecido, senão usa o texto padrão
  const selectedLabel = value 
    ? (data.find((item) => item.value === value)?.label || '')
    : '';

  const displayText = selectedLabel || placeholder || 'Selecione uma opção';
  const isPlaceholder = !selectedLabel;

  const handleSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: finalBackgroundColor, borderRadius: 20 }]}>
      <Text style={[styles.label, { color: finalLabelColor }]}>{label}</Text>

      <TouchableOpacity
        style={styles.selectButton}
        onPress={openModal}
        activeOpacity={0.7}
        delayLongPress={500}
        onLongPress={() => {}}
      >
        <Text 
          style={[
            styles.selectButtonText, 
            { color: finalTextColor },
            isPlaceholder && styles.placeholderText
          ]}
        >
          {displayText}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={24}
          color={finalTextColor}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent={true}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContent,
                {
                  backgroundColor: isDark ? colors.surface : '#ffffff',
                  borderTopColor: isDark ? colors.border : '#e5e7eb',
                },
              ]}
            >
              <View
                style={[
                  styles.modalHeader,
                  {
                    borderBottomColor: isDark ? colors.border : '#e5e7eb',
                  },
                ]}
              >
                <Text style={[styles.modalTitle, { color: finalTextColor }]}>
                  {label}
                </Text>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color={finalTextColor}
                  />
                </TouchableOpacity>
              </View>

              <FlatList
                data={data}
                keyExtractor={(item) => item.value}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalListContent}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.modalItem,
                      {
                        borderBottomColor: isDark ? colors.border : '#f3f4f6',
                      },
                      value === item.value && {
                        backgroundColor: isDark
                          ? 'rgba(255, 255, 255, 0.1)'
                          : '#f3f4f6',
                      },
                    ]}
                    onPress={() => handleSelect(item.value)}
                    activeOpacity={0.6}
                    delayLongPress={500}
                    onLongPress={() => {}}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        { color: finalTextColor },
                        value === item.value && styles.modalItemTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {value === item.value && (
                      <MaterialCommunityIcons
                        name="check"
                        size={20}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginVertical: 8,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },

  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },

  selectButtonText: {
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
  },

  placeholderText: {
    opacity: 0.5,
    fontWeight: '400',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    borderTopWidth: 1,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  modalListContent: {
    paddingVertical: 8,
  },

  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    minHeight: 70,
    borderBottomWidth: 1,
  },

  modalItemText: {
    fontSize: 16,
  },

  modalItemTextSelected: {
    fontWeight: '500',
  },
});

export default SelectBasico;