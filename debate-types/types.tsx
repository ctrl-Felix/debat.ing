import {Opd} from "@/debate-types/opd";
import {DebateInterface} from "@/debate-types/interfaces";
import {Bp} from "@/debate-types/bp";

interface DebateConstructor {
    new (): DebateInterface;
}
interface DebateTypes {
    [key: string]: DebateConstructor
}
export const debateTypes: DebateTypes = {
    opd: Opd,
    bp: Bp
}

