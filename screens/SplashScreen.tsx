import React, {useEffect} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {getPlatform} from '../utils/Platform';
import {getUserFromAsyncStorage} from '../store/slices/userSlice';
import {useAppDispatch, useAppSelector} from '../store/store';

const SplashScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user);
  useEffect(() => {
    if (getPlatform() !== 'web') {
      dispatch(getUserFromAsyncStorage());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user.token !== null) {
      navigation.navigate('Home');
    }
  }, [navigation, user]);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator color="#000000" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fbc405',
  },
});

export default SplashScreen;
