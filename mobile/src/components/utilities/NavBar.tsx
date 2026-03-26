import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BackButton from '@components/botoes/BackButton';
import NavTitle from '@components/NavTitle';
import UserIcon from '@components/UserIcon';
import LogoIcon from '@components/LogoIcon';
import DialogUserMenu from '@components/dialogs/DialogUserMenu';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@context/types';
import { useTheme } from '@context/ThemeContext';

type Props = {
  backButton?: boolean;
  title: string;
  onBack?: () => void;
};

const NavBar = ({ backButton, title, onBack }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [show, setShow] = useState(false);
  const { colors } = useTheme();

  const handleClose = () => setShow(false);
  const handleShowDialog = () => setShow(true);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.nav}>
        {backButton ? (
          <BackButton
            onPress={() => (onBack ? onBack() : navigation.goBack())}
          />
        ) : (
          <LogoIcon />
        )}
        <NavTitle title={title} />
        <UserIcon onPress={handleShowDialog} />
      </View>
      <DialogUserMenu show={show} onClose={handleClose} />
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
