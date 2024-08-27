export interface DebateInterface {
    config: DebateConfiguration

    generateProcedure(variables: ParsedDebateVariables): Array<DebateProcedure>
}

export interface DebateConfiguration {
    title: string
    description: string
    code: string
    variables: Array<DebateVariable>
    procedure: Array<DebateProcedure>
}

interface DebateVariable {
    title: string
    code: string
    description: string
    type: 'string' | 'number' | 'boolean'
}

export interface DebateProcedure {
    title: string
    seconds: Number
}

export interface ParsedDebateVariables {
    [key: string]: number | string | boolean
}