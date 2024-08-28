import {Stack} from "expo-router";
import * as React from "react";
import {Button} from "react-native-paper";

export default function DebateLayout() {
    return (
        <Stack
            screenOptions={{

            }}>
            <Stack.Screen name="[code]" options={{
                headerShown: true,
                title: "Configure Debate",
                headerBackButtonMenuEnabled: true,
                headerBackVisible: true,
                headerBackTitle: "Back"
            }} />
            <Stack.Screen name="index" options={{
                headerShown: true,
                headerTitle: "Select Debate Style"
            }} />
            <Stack.Screen name="execute" options={{
                headerTitle: "Debate",
                headerBackTitle: "Back",
                headerShown: true
            }} />
        </Stack>

    )
}