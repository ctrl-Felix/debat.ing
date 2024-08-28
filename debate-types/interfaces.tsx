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
    default: number | string | boolean
}

export interface DebateProcedure {
    title: string
    seconds: Number
    actions: Array<DebateAction>
}

export interface DebateAction {
    ring: null | 'single' | 'double'
    after: number
    mode: 'alert' | 'danger' | 'warning' | 'safe' | 'default'
}

export interface ParsedDebateVariables {
    [key: string]: number | string | boolean
}