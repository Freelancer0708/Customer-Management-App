import React from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../components/auth/AuthContext';
import { Header } from '../components/header/Header';
import '../components/css/base.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
        <Header/>
        <main>
            <Component {...pageProps} />
        </main>
    </AuthProvider>
  );
}

export default App;
