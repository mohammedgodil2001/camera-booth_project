// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import { PhotoProvider } from '../contexts/PhotoContext';


// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [fontsLoaded] = useFonts({
//     'grotesk': require('../assets/images/fonts/HelveticaNeue-Roman.otf'),
//   });

//   useEffect(() => {
//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <PhotoProvider>
//       <Stack>
//         <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
//         <Stack.Screen name="upload" options={{ title: 'Upload', headerShown: false }} />
//         <Stack.Screen name="customize" options={{ title: 'Customize', headerShown: false }} />
//         <Stack.Screen name="preview" options={{ title: 'Preview', headerShown: false }} />
//       </Stack>
//     </PhotoProvider>
//   );
// }



import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'grotesk': require('../assets/images/fonts/HelveticaNeue-Roman.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="upload" options={{ title: 'Upload', headerShown: false }} />
      <Stack.Screen name="customize" options={{ title: 'Customize', headerShown: false }} />
      <Stack.Screen name="preview" options={{ title: 'Preview', headerShown: false }} />
    </Stack>
  );
}