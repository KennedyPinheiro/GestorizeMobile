import React from "react";
import { useRouter } from "expo-router";
import LoginView from "./LoginView"; 

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(tabs)"); 
  };

  return <LoginView onLogin={handleLogin} />;
}
