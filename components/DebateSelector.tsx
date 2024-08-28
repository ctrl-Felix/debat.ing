import * as React from "react";
import { Card, Button, Text } from 'react-native-paper';
import {View, StyleSheet} from "react-native";
import {debateTypes} from "@/debate-types/types";
import {router} from "expo-router";

export default function DebateSelector() {
    return (
        <View style={styles.list}>
                { Object.keys(debateTypes).map( (key, index) => {
                    let debateInstance = new debateTypes[key]
                    return (
                        <Card key={index} style={styles.w_full}>
                            <Card.Content>
                                <Text variant={"headlineMedium"} style={styles.card_title}>{debateInstance.config.title}</Text>
                                <Text>{debateInstance.config.description}</Text>
                            </Card.Content>
                            <Card.Title
                                title={""}
                                titleVariant={"headlineMedium"}
                                right={(props) =>
                                    <View style={styles.buttonContainer}>
                                        <Button mode={"outlined"}>Edit</Button>
                                        <Button mode={"contained"} onPress={() => {
                                            let path = "/debate/" + debateInstance.config.code
                                            // @ts-ignore
                                            router.push(path)
                                        }}>Start</Button>
                                    </View>}
                            />

                        </Card>
                    )
                })

                }


        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    w_full : {
        width: '98%'
    },
    list: {
        width: '98%',
        gap: 5

    },
    card_title: {
      marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 5,
        gap: 10
    }
});