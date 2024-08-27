import {Stack} from "expo-router";
import * as React from "react";

export default function DebateLayout() {
    return (
        <Stack
            screenOptions={{
            }}>
            <Stack.Screen name="debate" options={{
                headerShown: false
            }} />
            <Stack.Screen name="selector" options={{
                headerShown: false
            }} />
        </Stack>

    )
}