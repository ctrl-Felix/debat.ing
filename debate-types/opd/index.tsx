import {DebateConfiguration, DebateInterface, DebateProcedure, ParsedDebateVariables} from "@/debate-types/interfaces";
import config from "@/debate-types/opd/config";

export const numberSuffix = (i: number): string => {
    switch (i) {
        case 1:
            return 'st'
        case 2:
            return 'nd'
        case 3:
            return 'rd'
        default:
            return 'th'

    }
}
export class Opd implements DebateInterface {
    config: DebateConfiguration;

    constructor() {
        this.config = config
    }

    generateProcedure(variables: ParsedDebateVariables): Array<DebateProcedure> {
        let nonAlignedSpeakersCount = variables["nasc"] as number

        let nonAlignedProcedure: Array<DebateProcedure> = []
        for (let i: number = 1; i <= nonAlignedSpeakersCount; i++){
            nonAlignedProcedure.push({
                "title": `${i}${numberSuffix(i)} Non-Aligned Speaker`,
                "seconds": 210
            })
        }

        let debateEndProcedure = nonAlignedSpeakersCount > 0 ?
            this.config.procedure.slice(4) :
            this.config.procedure.slice(4).reverse()

        return [
            ...this.config.procedure.slice(0, 3),
            ...nonAlignedProcedure,
            ...debateEndProcedure

        ];
    }

}