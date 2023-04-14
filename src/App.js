import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, View, Card, Image } from '@aws-amplify/ui-react';
import NavBar from './components/NavBar';

function App({ signOut }) {
  React.useEffect(() => {
    document.title = 'Sioux City Uploads';
  }, []);
  const handleSignOut = () => {
    signOut();
  };

  return (
    <ThemeProvider>
      <View className='App'>
        <NavBar onSignOut={handleSignOut} />
      </View>
    </ThemeProvider>
  );
}

export default withAuthenticator(App, {
  hideSignUp: true,
});
