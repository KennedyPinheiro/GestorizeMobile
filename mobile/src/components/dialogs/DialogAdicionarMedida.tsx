import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import EditableTextCard from '@components/EditableTextCard';
import Button from '@components/botoes/Button';
import ErrorSidebarAlert from '@components/sidebars/ErrorSidebarAlert';
import { MedidaType } from '@context/types';
import { supabase } from '@lib/supabase';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (medida: MedidaType) => void;
  disabled?: boolean;
}

const DialogAdicionarMedida = ({ open, onClose, onSave, disabled }: Props) => {
  const [titulo, setTitulo] = useState('');
  const [erroVisible, setErroVisible] = useState(false);
  const [erroMessage, setErroMessage] = useState('');
  const isFormValid = titulo.trim() !== '';

  useEffect(() => {
    if (!open) {
      setTitulo('');
      setErroVisible(false);
      setErroMessage('');
    }
  }, [open]);

  const salvarMedida = async () => {
    try {
      if (!titulo.trim()) {
        setErroMessage('Por favor, informe o nome da medida');
        setErroVisible(true);
        return;
      }

      const { data, error } = await supabase
        .from('medidas')
        .insert({ titulo })
        .select()
        .single();

      if (error) throw error;

      onSave(data);
      onClose();
    } catch (e: any) {
      setErroMessage(
        'Erro ao salvar medida: ' + (e?.message ?? 'Erro desconhecido'),
      );
      setErroVisible(true);
    }
  };

  return (
    <Modal
      transparent
      visible={open}
      onRequestClose={onClose}
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <ErrorSidebarAlert
                visible={erroVisible}
                message={erroMessage}
                onClose={() => setErroVisible(false)}
              />

              <View style={styles.header}>
                <Text style={styles.title}>Adicionar Medida</Text>
              </View>

              <View style={styles.body}>
                <EditableTextCard
                  label="TÍTULO"
                  placeholder="Digite o título da medida"
                  value={titulo}
                  onChangeText={setTitulo}
                />
              </View>

              <View style={styles.footer}>
                <Button
                  title="ADICIONAR"
                  onPress={salvarMedida}
                  disabled={disabled || !isFormValid}
                  variant="contained"
                  color="primary"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DialogAdicionarMedida;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: '#062046',
    borderWidth: 3,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#062046',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
