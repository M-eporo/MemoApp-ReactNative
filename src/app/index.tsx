import { Redirect, router } from 'expo-router';
import { onAuthStateChanged, UserCredential } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../firebase';

const Index = () => {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) {
        router.replace("/memo/list")
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <Redirect href="auth/log_in" />
  )
}

export default Index