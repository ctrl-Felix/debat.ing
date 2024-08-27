import {DebateConfiguration, DebateInterface, DebateProcedure, ParsedDebateVariables} from "@/debate-types/interfaces";
import config from "@/debate-types/bp/config";


export class Bp implements DebateInterface {
    config: DebateConfiguration;

    constructor() {
        this.config = config
    }

    generateProcedure(variables: ParsedDebateVariables): Array<DebateProcedure> {
        return this.config.procedure
    }

}