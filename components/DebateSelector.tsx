import * as React from "react";
import { Card, Button } from 'react-native-paper';
import {View, StyleSheet} from "react-native";
import {debateTypes} from "@/debate-types/types";

export default function DebateSelector() {
    return (
        <View style={styles.list}>
                { Object.keys(debateTypes).map( (key, index) => {
                    let debateInstance = new debateTypes[key]
                    return (
                        <Card key={index} style={styles.w_full}>
                        <Card.Title
                            titleVariant={"headlineMedium"}
                            title={debateInstance.config.title}
                            subtitle={debateInstance.config.description}
                            right={(props) =>
                                <View style={styles.buttonContainer}>
                                    <Button mode={"outlined"}>Edit</Button>
                                    <Button mode={"contained"}>Start</Button>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 5,
        gap: 10
    }
});