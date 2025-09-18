// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }



// app/_layout.tsx


// app/_layout.tsx
import { Stack } from 'expo-router';
import { PhotoProvider } from '../contexts/PhotoContext'; // Adjust this path to where you put the context file

export default function RootLayout() {
  return (
    <PhotoProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="upload" options={{ title: 'Upload', headerShown: false }} />
        <Stack.Screen name="customize" options={{ title: 'Customize', headerShown: false }} />
        <Stack.Screen name="preview" options={{ title: 'Preview', headerShown: false }} />
      </Stack>
    </PhotoProvider>
  );
}