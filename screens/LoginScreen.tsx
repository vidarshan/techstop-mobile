import React, {FC} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {getPlatform} from '../utils/Platform';
import {ILoginScreen} from '../models/ILoginScreen';
import {useNavigate} from 'react-router';

const LoginScreen: FC<ILoginScreen> = ({navigation}) => {
  let webNavigation: any = {};

  if (getPlatform() === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    webNavigation = useNavigate();
  }
  return (
    <SafeAreaView style={styles.authContainer}>
      <View
        style={
          getPlatform() === 'web' ? styles.authScreenWeb : styles.authScreen
        }>
        <Text style={styles.authHeaderText}>Login to your account</Text>
        <TextInput style={styles.authInput} placeholder="Your Email" />
        <TextInput style={styles.authInput} placeholder="Your Password" />
        <TouchableOpacity style={styles.authButton}>
          <Text style={styles.authText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.authInvertedButton}
          onPress={() => {
            getPlatform() === 'web'
              ? webNavigation('/register')
              : navigation.navigate('Register');
          }}>
          <Text style={styles.authInvertedButtonText}>New User?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  authScreenWeb: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 18,
    marginRight: 18,
    height: '100vh',
  },
  authScreen: {
    marginLeft: 18,
    marginRight: 18,
  },
  authHeaderText: {
    fontSize: 24,
  },
  authInput: {
    fontSize: 18,
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    borderColor: '#ddd',
    marginTop: 20,
  },
  authButton: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#DF2E38',
    marginTop: 20,
  },
  authInvertedButton: {
    borderRadius: 8,
    marginTop: 16,
    color: '#DF2E38',
  },
  authText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  authInvertedButtonText: {
    padding: 12,
    color: '#DF2E38',
    textAlign: 'center',
  },
});

export default LoginScreen;
