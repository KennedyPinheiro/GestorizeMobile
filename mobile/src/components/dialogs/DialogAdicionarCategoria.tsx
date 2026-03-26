import React, { useState, useEffect } from 'react';
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
import { CategoriaType } from '@context/types';
import { supabase } from '@lib/supabase';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (categoria: CategoriaType) => void;
  disabled?: boolean;
};

const DialogAdicionarCategoria = ({
  open,
  onClose,
  onSave,
  disabled,
}: Props) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erroVisible, setErroVisible] = useState(false);
  const [erroMessage, setErroMessage] = useState('');

  useEffect(() => {
    if (!open) {
      setTitulo('');
      setDescricao('');
      setErroVisible(false);
      setErroMessage('');
    }
  }, [open]);

  const salvarCategoria = async () => {
    try {
      if (!titulo.trim()) {
        setErroMessage('Por favor, informe o nome da categoria');
        setErroVisible(true);
        return;
      }

      const { data, error } = await supabase
        .from('categorias')
        .insert({ titulo, descricao })
        .select()
        .single();

      if (error) throw error;

      onSave(data);
      onClose();
    } catch (error: any) {
      setErroMessage(
        'Erro ao salvar categoria: ' + (error?.message || 'Erro desconhecido'),
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
                <Text style={styles.title}>Adicionar Categoria</Text>
              </View>

              <View style={styles.body}>
                <EditableTextCard
                  label="TÍTULO"
                  placeholder="Digite o título da categoria"
                  value={titulo}
                  onChangeText={setTitulo}
                />
                <EditableTextCard
                  label="DESCRIÇÃO"
                  placeholder="Descrição opcional"
                  value={descricao}
                  onChangeText={setDescricao}
                />
              </View>

              <View style={styles.footer}>
                <Button
                  title="ADICIONAR"
                  onPress={salvarCategoria}
                  disabled={disabled}
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

export default DialogAdicionarCategoria;

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
