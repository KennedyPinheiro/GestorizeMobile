  import { StyleSheet, View } from "react-native";
  import Button from "./Button";

  type props = {
    show: boolean;
    onClose: () => void;
    onSuccess?: () => void;
  };

  const DialogUserMenu = ({ show, onClose, onSuccess }: props) => {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: "#E8EAE1",
        minHeight: 150,
        width: 250,
        marginTop: 40
      },
    });

    if (!show) return null;
  return (
    <View style={styles.container}>
      <View>
        <Button onPress={onSuccess} title="Confirmar" />
      </View>
      <View>
        <Button onPress={onClose} title="Cancelar" />
      </View>
      <View>
        <Button title="Outro botão" />
      </View>
      <View>
        <Button title="Mais um botão" />
      </View>
    </View>
  );
};

export default DialogUserMenu;
