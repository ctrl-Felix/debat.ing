import { View, Text, StyleSheet } from 'react-native';
import DebateSelector from "@/components/DebateSelector";

export default function Selector() {
    return (
        <View style={styles.container}>
            <DebateSelector/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
