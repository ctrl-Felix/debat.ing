import {DebateAction, DebateConfiguration} from "@/debate-types/interfaces";

const defaultSpeakerActions: Array<DebateAction> = [
    {
        after: 60,
        ring: 1,
        mode: "danger"
    }
]

const config: DebateConfiguration = {
    "title": "British Parliamentary",
    "code": "bp",
    "description": "British Parliamentary Style debate is one of the more popular forms, based on debates in the British Parliament.",
    "procedure": [
        {
            "title": "Prime Minister",
            "seconds": 420,
            "actions": defaultSpeakerActions
        },
        {
            "title": "Leader of the Opposition",
            "seconds": 420,
            "actions": defaultSpeakerActions
        },
        {
            "title": "Deputy Prime Minister",
            "seconds": 420,
            "actions": defaultSpeakerActions
        },
        {
            "title": "Deputy Leader of the Opposition",
            "seconds": 420,
            "actions": defaultSpeakerActions
        },
        {
            "title": "Member of Government",
            "seconds": 420,
            "actions": defaultSpeakerActions
        },
        {
            "title": "Member of Opposition",
            "seconds": 420,
            "actions": defaultSpeakerActions
        },
        {
            "title": "Government Whip",
            "seconds": 420,
            "actions": defaultSpeakerActions
        },
        {
            "title": "Opposition Whip",
            "seconds": 420,
            "actions": defaultSpeakerActions
        }
    ],
    "variables": []
}

export default config