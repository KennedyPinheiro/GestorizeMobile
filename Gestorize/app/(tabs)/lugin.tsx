import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import InputCard from "@/components/InputCard";
import Button from "@/components/Button";
import LogoIcon from "@/components/LogoIcon";
import Link from "@/components/Link";
import Linha from "@/components/Linha";
import PasswordInputCard from "@/components/PasswordInputCard";
import NavTittle from "@/components/NavTittle";
import NavBar from "@/components/Navbar";

type Props = {
  onLogin?: () => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAE1",
    paddingHorizontal: 16,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spacerTop: {
    marginBottom: -60,
  },
  section: {
    width: "100%",
    alignItems: "center",
  },
  linkSection: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 20,
    marginBottom: 30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  footerTexto: {
    marginRight: 5,
  },
});
const lugin = ({ onLogin }: Props) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <NavBar/>
      
    </TouchableWithoutFeedback>
  );
};

export default lugin;
