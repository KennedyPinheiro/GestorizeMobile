import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserIcon from "@components/UserIcon";
import DialogUserMenu from "@components/dialogs/DialogUserMenu";
import { useState } from "react";
import PessoaFisicaIcon from "@components/Icons/PessoaFisicaIcon";
import PessoaJuridicaIcon from "@components/Icons/PessoaJuridicaIcon";
import FornecedorIcon from "@components/Icons/FornecedorIcon";
import ProdutoIcon from "@components/Icons/ProdutoIcon";

type props = {
  titulo?: string;
  showPessoaFisicaIcon?: boolean;
  showPessoaJuridicaIcon?: boolean;
  showFornecedorIcon?: boolean;
  showProdutoIcon?: boolean;
  onBackPress?: () => void;
};
const Nav = ({
  titulo,
  showFornecedorIcon,
  showPessoaFisicaIcon,
  showPessoaJuridicaIcon,
  showProdutoIcon,
  onBackPress,
}: props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShowDialog = () => {
    setShow(true);
  };

  const hasExtraIcon =
    showPessoaFisicaIcon ||
    showPessoaJuridicaIcon ||
    showFornecedorIcon ||
    showProdutoIcon;

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.leftIcon} onPress={onBackPress}>
          <Ionicons name="chevron-back" size={30} color="#fff" />
          {showPessoaFisicaIcon && <PessoaFisicaIcon size={40} iconSize={30} />}
          {showPessoaJuridicaIcon && (
            <PessoaJuridicaIcon size={40} iconSize={30} />
          )}
          {showFornecedorIcon && <FornecedorIcon size={40} iconSize={30} />}
          {showProdutoIcon && <ProdutoIcon size={40} iconSize={30} />}
          {hasExtraIcon && <Text style={styles.tituloInline}>{titulo}</Text>}
        </TouchableOpacity>

        {!hasExtraIcon && <Text style={styles.titulo}>{titulo}</Text>}

        <View style={styles.rightIcon}>
          <UserIcon onPress={handleShowDialog} />
        </View>
      </View>

      <DialogUserMenu show={show} onClose={handleClose} />
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#062046",
    height: "13%",
    width: "100%",
    justifyContent: "center",
    paddingTop: 35,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  titulo: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
  },
  tituloInline: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "800",
    marginLeft: 10,
  },
  leftIcon: {
    position: "absolute",
    left: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  rightIcon: {
    position: "absolute",
    right: 45,
  },
});
