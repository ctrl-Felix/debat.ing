import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import {useLocalSearchParams, useGlobalSearchParams, Link, Redirect, useFocusEffect, router} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {debateTypes} from "@/debate-types/types";
import {useCallback, useEffect, useState} from "react";
import {convert} from "@/utils/converter";

const friends = ['charlie', 'james']

export default function Route() {
    const [variables, setVariables] = useState({});

    const glob = useGlobalSearchParams();
    const local = useLocalSearchParams();

    let debateCode = local.code as string;
    if (!(debateCode in debateTypes)) {
        return <Redirect href={"/"}></Redirect>
    }

    let debateInstance = new debateTypes[debateCode]()

    useFocusEffect(
        useCallback(() => {
            let newVariables: {[key: string]: string} = {}
            for (const variable of debateInstance.config.variables){
                newVariables[variable.code] = variable.default as string
            }
            setVariables(newVariables)

        }, [])

    )

    async function startDebate() {
        let procedure = debateInstance.generateProcedure(variables)
        let jsonProcedure = JSON.stringify(procedure)
        await AsyncStorage.setItem('procedure', jsonProcedure)
        await AsyncStorage.setItem('code', debateCode)

        router.push("/debate/execute")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.margin} variant={"headlineLarge"}>{debateInstance.config.title}</Text>
            { debateInstance.config.variables.map((variable, index) => (
                variable.code in variables &&
                <TextInput
                    mode={"outlined"}
                    key={index}
                    style={styles.input}
                    label={variable.title}
                    // @ts-ignore
                    value={variables[variable.code] !== 0 ? variables[variable.code] : "0"}
                    onChangeText={n => {
                        let newValue = convert(n, variable.type)
                        if (newValue !== null) {
                            setVariables({
                                ...variables,
                                [variable.code]: newValue
                            })
                        }

                    }}
                />
                ))}
            <Button style={styles.start_button} mode={"contained"} onPress={startDebate}>Start Debate</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        width: '98%'
    },
    margin: {
        marginBottom: 15,
        marginTop: 15
    },
    start_button: {
        width: "98%",
        marginTop: 35
    }
});
