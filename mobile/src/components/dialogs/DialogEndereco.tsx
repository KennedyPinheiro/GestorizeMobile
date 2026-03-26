import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import InputCard from '@components/InputCard';
import { Select, MenuItem } from '@components/utilities/Select';
import Button from '@components/botoes/Button';
import { formatCep } from '@@core/format';
import ErrorSidebarAlert from '@components/sidebars/ErrorSidebarAlert';
import { EnderecoType } from '@context/types';

export const estadosBrasileiros = [
  'Acre',
  'Alagoas',
  'Amapá',
  'Amazonas',
  'Bahia',
  'Ceará',
  'Distrito Federal',
  'Espírito Santo',
  'Goiás',
  'Maranhão',
  'Mato Grosso',
  'Mato Grosso do Sul',
  'Minas Gerais',
  'Pará',
  'Paraíba',
  'Paraná',
  'Pernambuco',
  'Piauí',
  'Rio de Janeiro',
  'Rio Grande do Norte',
  'Rio Grande do Sul',
  'Rondônia',
  'Roraima',
  'Santa Catarina',
  'São Paulo',
  'Sergipe',
  'Tocantins',
];

type DialogEnderecoProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (endereco: EnderecoType) => void;
  disabled?: boolean;
};

const DialogEndereco = ({
  visible,
  onClose,
  onSave,
  disabled = false,
}: DialogEnderecoProps) => {
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [estado, setEstado] = useState<string>('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSalvar = () => {
    if (disabled) return;

    if (!rua.trim()) {
      setErrorMessage('Por favor, informe a rua');
      setErrorVisible(true);
      return;
    }
    if (!bairro.trim()) {
      setErrorMessage('Por favor, informe o bairro');
      setErrorVisible(true);
      return;
    }
    if (!cidade.trim()) {
      setErrorMessage('Por favor, informe a cidade');
      setErrorVisible(true);
      return;
    }
    if (!estado.trim()) {
      setErrorMessage('Por favor, informe o estado');
      setErrorVisible(true);
      return;
    }

    onSave({
      rua,
      bairro,
      cidade,
      estado,
      numero,
      cep,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <ErrorSidebarAlert
        message={errorMessage}
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
      />
      <TouchableWithoutFeedback onPress={disabled ? undefined : onClose}>
        <View style={[styles.overlay, disabled && styles.overlayDisabled]}>
          <TouchableWithoutFeedback>
            <View
              style={[styles.container, disabled && styles.containerDisabled]}
            >
              <View style={[styles.header, disabled && styles.headerDisabled]}>
                <Text style={[styles.title, disabled && styles.titleDisabled]}>
                  Endereço
                </Text>
              </View>

              <View style={styles.content}>
                <InputCard
                  label="Rua"
                  placeholder="Digite o nome da rua"
                  tipo="string"
                  value={rua}
                  onChangeText={setRua}
                />
                <InputCard
                  label="Bairro"
                  placeholder="Digite o nome do bairro"
                  tipo="string"
                  value={bairro}
                  onChangeText={setBairro}
                />
                <InputCard
                  label="Cidade"
                  placeholder="Digite o nome da cidade"
                  tipo="string"
                  value={cidade}
                  onChangeText={setCidade}
                />
                <InputCard
                  label="Número"
                  placeholder="Digite o n°"
                  tipo="number"
                  value={numero}
                  onChangeText={setNumero}
                />
                <Select
                  value={estado}
                  onChange={setEstado}
                  label="Estado"
                  size="small"
                >
                  {estadosBrasileiros.map((uf) => (
                    <MenuItem key={uf} value={uf}>
                      {uf}
                    </MenuItem>
                  ))}
                </Select>
                <InputCard
                  label="Cep"
                  placeholder="Digite o seu Cep"
                  tipo="number"
                  value={cep}
                  onChangeText={(text) => {
                    setCep(formatCep(text));
                  }}
                />
                <View style={styles.buttonContainer}>
                  <Button
                    title="Confirmar"
                    onPress={handleSalvar}
                    disabled={disabled}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  overlayDisabled: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    overflow: 'hidden',
    borderColor: '#062046',
    borderWidth: 3,
  },
  containerDisabled: {
    opacity: 0.7,
    borderColor: '#888',
  },
  header: {
    backgroundColor: '#062046',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerDisabled: {
    backgroundColor: '#888',
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
    color: '#fff',
  },
  titleDisabled: {
    color: '#eee',
  },
  content: {
    padding: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

export default DialogEndereco;
