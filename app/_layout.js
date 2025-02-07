import React from "react";
import { Stack } from "expo-router";
import ReduxProvider from "../redux/Redux";

export default function RootLayout() {
  return (
      <ReduxProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ReduxProvider>
  );
}