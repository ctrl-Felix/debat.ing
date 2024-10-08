import {DebateAction, DebateConfiguration} from "@/debate-types/interfaces";

const defaultSpeakerActions: Array<DebateAction> = [
    {
        after: 60,
        ring: 1,
        mode: 'safe'
    },
    {
        after: 360,
        ring: 1,
        mode: 'warning'
    },
    {
        after: 420,
        ring: 2,
        mode: 'danger'
    },
    {
        after: 435,
        ring: 3,
        mode: 'alert'
    }
]

const config: DebateConfiguration = {
    "title": "Open Parliamentary Debate",
    "code": "opd",
    "description": "The Open Parliamentary Index is an academic ndebate format fit for tournament use. It combines the nsport aspect of the parliamentary debate with the nrealism of a public debate. It provides room for ndevelopment and improvement of well-understood nrhetoric under the conditions of productive agonality.",
    "procedure": [
        {
            "title": "Opening Speaker of the Government",
            "seconds": 420,
            "actions": defaultSpeakerActions
        },
        {
            "title": "Opening Speaker of the Opposition",
            "seconds": 420,
            "actions": defaultSpeakerActions
        },
        {
            "title": "Extension Speaker of the Government",
            "seconds": 420,
            "actions": defaultSpeakerActions
        },
        {
            "title": "Extension Speaker of the Government",
            "seconds": 420,
            "actions": defaultSpeakerActions
        },
        {
            "title": "Closing Speaker of the Government",
            "seconds": 420,
            "actions": defaultSpeakerActions
        },
        {
            "title": "Closing Speaker of the Government",
            "seconds": 420,
            "actions": defaultSpeakerActions
        }
    ],
    "variables": [
        {
            "title": "Non-Aligned speakers count",
            "code": "nasc",
            "description": "",
            "type": "number",
            "default": 3

        }
    ]
}

export default config