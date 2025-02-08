import React from "react";
import { Stack } from "expo-router";
import ReduxProvider from "../redux/Redux";
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <ReduxProvider>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </ReduxProvider>
  );
}