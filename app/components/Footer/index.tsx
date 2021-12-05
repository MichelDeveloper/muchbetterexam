import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

interface FooterProps {
  deleteStorage: () => void;
}

interface NavigationProps {
  openDrawer: () => void;
}

const Footer = ({ deleteStorage }: FooterProps) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <>
      <Icon
        containerStyle={styles.deleteIcon}
        raised
        size={32}
        name='trash'
        type='font-awesome-5'
        color='#C70039'
        onPress={() => deleteStorage()}
        tvParallaxProperties={undefined}
      />
      <Icon
        containerStyle={styles.trophyIcon}
        raised
        size={32}
        name='trophy'
        type='font-awesome-5'
        color='#228B22'
        onPress={() => navigation.openDrawer()}
        tvParallaxProperties={undefined}
      />
    </>
  );
};

const styles = StyleSheet.create({
  trophyIcon: {
    position: 'absolute',
    bottom: 32,
    right: 24,
  },
  deleteIcon: {
    position: 'absolute',
    bottom: 32,
    left: 24,
  },
});

export default Footer;
