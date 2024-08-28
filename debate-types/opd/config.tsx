import {DebateConfiguration} from "@/debate-types/interfaces";

const config: DebateConfiguration = {
    "title": "Open Parliamentary Debate",
    "code": "opd",
    "description": "The Open Parliamentary Selector is an academic ndebate format fit for tournament use. It combines the nsport aspect of the parliamentary debate with the nrealism of a public debate. It provides room for ndevelopment and improvement of well-understood nrhetoric under the conditions of productive agonality.",
    "procedure": [
        {
            "title": "Opening Speaker of the Government",
            "seconds": 420
        },
        {
            "title": "Opening Speaker of the Opposition",
            "seconds": 420
        },
        {
            "title": "Extension Speaker of the Government",
            "seconds": 420
        },
        {
            "title": "Extension Speaker of the Government",
            "seconds": 420
        },
        {
            "title": "Closing Speaker of the Government",
            "seconds": 420
        },
        {
            "title": "Closing Speaker of the Government",
            "seconds": 420
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