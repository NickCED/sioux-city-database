import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, View, Card, Image } from '@aws-amplify/ui-react';
import NavBar from './components/NavBar';
import SlideShow from './components/tempSlide';

function App({ signOut }) {
  const handleSignOut = () => {
    signOut();
  };
  setTimeout(() => {
    document.querySelector('.sioux-city-uploads').style.opacity = 1;
  }, 2500);

  return (
    <ThemeProvider>
      <View className='App'>
        <NavBar onSignOut={handleSignOut} />
      </View>
      <View>
        <Card
          textAlign={'center'}
          className='sioux-city-uploads'
          style={{
            opacity: 0,
            transition: 'opacity 2s ease-in-out',
          }}
        >
          <h1>Sioux City Uploads coming soon...</h1>
        </Card>
      </View>
      <View>
        <Card className='slider' height={'40vh'}>
          <SlideShow />
        </Card>
      </View>
    </ThemeProvider>
  );
}

export default withAuthenticator(App, {
  hideSignUp: true,
});
