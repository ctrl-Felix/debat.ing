import DebateSelector from "@/components/DebateSelector";
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text, Button, ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useCallback, useEffect, useState} from "react";
import {Redirect, router, useFocusEffect} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {debateTypes} from "@/debate-types/types";
import {secondsToMinuteString} from "@/utils/converter";
import { Audio } from 'expo-av';
import {DebateAction, DebateProcedure} from "@/debate-types/interfaces";

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const modeToColour: { [key: string]: string} = {
    danger: "#950606",
    alert: "#950606",
    safe: "#06402b",
    warning: "#f58700",
    default: "#000000"
}
export default function Execute() {
    const [loading, setLoading] = useState(true)
    const [procedure, setProcedure] = useState([])
    const [code, setCode] = useState("")
    const [currentProcedureId, setCurrentProcedureId] = useState(0)
    const [remainingSeconds, setRemainingSeconds] = useState(0)
    const [running, setRunning] = useState(false)
    const [nextActionId, setNextActionId] = useState(0)
    const [mode, setMode] = useState("default")

    useFocusEffect(
        useCallback(() => {
            const setup = async () => {
                let value = await AsyncStorage.getItem('procedure')
                let code = await AsyncStorage.getItem('code')
                if (value !== null && code !== null) {
                    let newProcedure = JSON.parse(value)
                    if (newProcedure.length == 0) {
                        router.dismiss(1)
                    }
                    setProcedure(newProcedure)
                    setRemainingSeconds(newProcedure[0]["seconds"])

                    setCode(code)
                }


                setLoading(false)

            }

            setup()
        }, [])
    );

    useEffect(() => {
        setNextActionId(0)
        setMode("default")
        updateNextAction()
    }, [procedure, currentProcedureId]);


    useEffect(() => {
        if(running){
            let timer = setTimeout(() => {
                setRemainingSeconds(remainingSeconds - 1)
            }, 1000)

            return () => {
                clearInterval(timer)
            }
        }
    }, [running, remainingSeconds])



    useEffect(() => {
        const currentProcedure = procedure[currentProcedureId]
        if (currentProcedure){
            setRunning(false)
            setRemainingSeconds(currentProcedure["seconds"])
        }
    }, [currentProcedureId]);



    useEffect(() => {
        const currentProcedure: DebateProcedure | null = procedure[currentProcedureId]
        const nextAction: Array<DebateAction> | null = currentProcedure ? currentProcedure["actions"][nextActionId] : null

        if (currentProcedure && nextAction){
            let action_timestamp = currentProcedure["seconds"] - nextAction["after"]
            if (remainingSeconds <= action_timestamp){
                if( nextAction["ring"] !== null ){
                    playRing(nextAction["ring"] === 'single' ? 1 : 2)
                }
                if (nextAction["mode"]){
                    setMode(nextAction["mode"])
                }


                setNextActionId(nextActionId + 1)

            }
        }
    }, [remainingSeconds]);

    const playRing = async (loops: number) => {
        const { sound } = await Audio.Sound.createAsync( require('../../../assets/sounds/bell.mp3'))
        await sound.playAsync()

        for (let i = 1; i < loops; i++){
            setTimeout( async () => {
                await sound.replayAsync()
            }, 650)

        }
    }

    const updateNextAction = () => {
        const currentProcedure: DebateProcedure | null = procedure[currentProcedureId]

        if (!currentProcedure){
            setNextActionId(0)
        }
        // @ts-ignore
        for (let i = 0; i < currentProcedure["actions"].length; i++ ){
            let after: number = currentProcedure["actions"][i]["after"]
            let activationTimestamp = currentProcedure["seconds"] - after
            if ( activationTimestamp < remainingSeconds){
                setNextActionId(i)
                return
            }

        }
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={true} color={MD2Colors.red800} />
            </View>
            )
    }




    let debateInstane = new debateTypes[code]()
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text variant={"displaySmall"} style={{textAlign: "center"}}>{procedure[currentProcedureId]["title"]}</Text>
            </View>
            <View>
                <Text style={{...styles.countdown, color: modeToColour[mode]}}>{secondsToMinuteString(remainingSeconds)}</Text>

                <View style={styles.countdown_control}>
                    <Button mode={"outlined"} disabled={running} onPress={() => {
                        setRemainingSeconds(remainingSeconds - 10)
                    }}>-10</Button>
                    <Button mode={"outlined"} disabled={running} onPress={() => {
                        setRemainingSeconds(remainingSeconds - 1)
                    }}>-1</Button>
                    <Button mode={"outlined"} disabled={running} onPress={() => {
                        setRemainingSeconds(remainingSeconds + 1)
                        updateNextAction()
                    }}>+1</Button>
                    <Button mode={"outlined"} disabled={running} onPress={() => {
                        setRemainingSeconds(remainingSeconds + 10)
                        updateNextAction()
                    }}>+10</Button>

                </View>
                <Button mode={"outlined"} disabled={running || remainingSeconds == procedure[currentProcedureId]["seconds"]} onPress={() => {
                    setRemainingSeconds(procedure[currentProcedureId]["seconds"])
                    setNextActionId(0)
                    setMode("default")
                }}>Reset Timer</Button>
            </View>
            <View style={styles.control_view}>
                <Button style={styles.control_button} mode={"outlined"}
                        disabled={currentProcedureId <= 0}
                        onPress={() => {
                            setCurrentProcedureId(currentProcedureId - 1)
                }}>Previous</Button>
                <Button style={styles.control_button} mode={"contained"} onPress={() => setRunning(!running)}>{running ? "Stop" : "Start"}</Button>
                <Button style={styles.control_button} mode={"outlined"}
                        disabled={currentProcedureId + 1 >= procedure.length }
                        onPress={() => {
                            setCurrentProcedureId(currentProcedureId + 1)
                }}>Next</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countdown: {
        fontVariant: ["tabular-nums"],
        fontSize: width * 0.35,
        fontWeight: "bold",
    },
    countdown_control: {
      flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    control_view: {
        flexDirection: "row",
        position: "absolute",
        bottom: 10,
        gap: 20
    },
    control_button: {
        width: 120
    },
    title: {
        flexDirection: "row",
        position: "absolute",
        top: 10,
        gap: 20,

    }
});
