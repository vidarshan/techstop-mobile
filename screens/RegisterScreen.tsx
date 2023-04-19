import React, {FC, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {getPlatform} from '../utils/Platform';
import {IRegisterScreen} from '../models/IRegisterScreen';
import {useNavigate} from 'react-router';
import {useAppDispatch, useAppSelector} from '../store/store';
import {registerUser, setUserToAsyncStorage} from '../store/slices/userSlice';

const RegisterScreen: FC<IRegisterScreen> = ({navigation}) => {
  let webNavigation: any = {};
  const dispatch = useAppDispatch();
  const [name, setName] = useState('Gates');
  const [password, setPassword] = useState('123456');
  const [email, setEmail] = useState('gates@3gmail.com');
  const {user} = useAppSelector(state => state.user);

  if (getPlatform() === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    webNavigation = useNavigate();
  }

  const register = () => {
    dispatch(registerUser({name, email, password}));
    dispatch(
      setUserToAsyncStorage({
        _id: user._id,
        email: user.email,
        name: user.name,
        token: user.token,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <View
        style={
          getPlatform() === 'web' ? styles.authScreenWeb : styles.authScreen
        }>
        <Text style={styles.authHeaderText}>Create your account</Text>
        <TextInput
          value={name}
          style={styles.authInput}
          placeholder="Your Name"
          onChangeText={text => setName(text)}
        />
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
        />
        <TouchableOpacity style={styles.authButton} onPress={() => register()}>
          <Text style={styles.authText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.authInvertedButton}
          onPress={() => {
            getPlatform() === 'web'
              ? webNavigation('/login')
              : navigation.navigate('SignIn');
          }}>
          <Text style={styles.authInvertedButtonText}>Current User?</Text>
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

export default RegisterScreen;
