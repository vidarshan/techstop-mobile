import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
import {useAppDispatch, useAppSelector} from '../store/store';
import {authUser} from '../store/slices/userSlice';

const LoginScreen: FC<ILoginScreen> = () => {
  let webNavigation: any = {};
  const dispatch = useAppDispatch();
  const {loginLoading, loginError, user} = useAppSelector(state => state.user);
  const [email, setEmail] = useState('john@gmail.com');
  const [password, setPassword] = useState('123456');

  if (getPlatform() === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    webNavigation = useNavigate();
    console.log(webNavigation);
  }

  const login = () => {
    dispatch(authUser({email, password}));
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <SafeAreaView style={styles.authContainer}>
      <View
        style={
          getPlatform() === 'web' ? styles.authScreenWeb : styles.authScreen
        }>
        <Text style={styles.authHeaderText}>Login to your account</Text>
        {loginError && (
          <Text style={styles.authErrorText}>
            Wrong credentials. Try again.
          </Text>
        )}
        <View style={styles.demoAlertContainer}>
          <Text style={styles.demoAlertText}>
            Use given credentials for a full tour of all features.
          </Text>
        </View>
        <TextInput
          value={email}
          style={styles.authInput}
          placeholder="Your Email"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          value={password}
          style={styles.authInput}
          placeholder="Your Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.authButton} onPress={() => login()}>
          {loginLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.authText}>Login</Text>
          )}
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
    backgroundColor: '#ffffff',
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
    backgroundColor: '#fbc405',
    marginTop: 20,
  },
  authInvertedButton: {
    borderRadius: 8,
    marginTop: 16,
    color: '#000000',
  },
  authText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
  },
  authInvertedButtonText: {
    padding: 12,
    color: '#000000',
    textAlign: 'center',
  },
  authErrorText: {
    color: '#DF2E38',
    marginTop: 5,
    fontWeight: '600',
  },
  demoAlertContainer: {
    marginTop: 10,
    borderRadius: 4,
  },
  demoAlertText: {
    color: '#949494',
    fontWeight: '500',
  },
});

export default LoginScreen;
