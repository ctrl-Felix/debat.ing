import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import DebateLayout from "@/app/(tabs)/debate/_layout";
import {HeaderBackButton} from "@react-navigation/elements";

export default function TabLayout() {
    return (
        <Tabs initialRouteName={"debate"}
              screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="debate"

                options={{
                    href: "/debate",
                    title: 'Debate',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    href: null
                }}
            />
        </Tabs>
    );
}
