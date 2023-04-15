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
import {
  authUser,
  getUserFromAsyncStorage,
  setUserToAsyncStorage,
} from '../store/slices/userSlice';
// import {nativeGetMyObject} from '../utils/Storage';

const LoginScreen: FC<ILoginScreen> = ({navigation}) => {
  let webNavigation: any = {};
  const dispatch = useAppDispatch();
  const {loading, error, user} = useAppSelector(state => state.user);
  const [email, setEmail] = useState('john@gmail.com');
  const [password, setPassword] = useState('123456');

  if (getPlatform() === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    webNavigation = useNavigate();
    console.log(webNavigation);
  }

  const login = () => {
    dispatch(authUser({email, password}));
    if (!error) {
      console.log('user', user);
      dispatch(
        setUserToAsyncStorage({
          _id: user._id,
          email: user.email,
          name: user.name,
          token: user.token,
        }),
      );
    }
  };

  useEffect(() => {
    if (getPlatform() !== 'web') {
      dispatch(getUserFromAsyncStorage());
      if (user.token !== null) {
        console.log(navigation);
        navigation.navigate('Home', {});
      }
    }
    console.log('ddd');
  }, [dispatch, navigation, user]);

  useEffect(() => {
    console.log('dddd');
  }, []);

  return (
    <SafeAreaView style={styles.authContainer}>
      <View
        style={
          getPlatform() === 'web' ? styles.authScreenWeb : styles.authScreen
        }>
        <Text style={styles.authHeaderText}>Login to your account</Text>
        <TextInput
          editable={!loading}
          value={email}
          style={styles.authInput}
          placeholder="Your Email"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          editable={!loading}
          value={password}
          style={styles.authInput}
          placeholder="Your Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        {console.log(loading)}
        <TouchableOpacity style={styles.authButton} onPress={() => login()}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.authText}>Login</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.authInvertedButton}
          onPress={() => {
            console.log(dispatch(getUserFromAsyncStorage()));
            // getPlatform() === 'web'
            //   ? webNavigation('/register')
            //   : navigation.navigate('Register');
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
