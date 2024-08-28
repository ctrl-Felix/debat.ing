import {number} from "prop-types";

export function convert(data: string, target: 'string' | 'number' | 'boolean'): string | number | null {
    if (target === 'string') {
        return String(data);
    } else if (target === 'number') {
        const parsedNumber = Number(data);
        return isNaN(parsedNumber) ? null : parsedNumber;
    }
    return null;
}

export function secondsToMinuteString(seconds: number): string {
    let isNegative = seconds < 0
    seconds = Math.abs(seconds)
    const minutes = Math.floor(seconds / 60)
    const remaining_seconds = seconds - 60 * minutes
    return (isNegative ? "+" : "") + minutes + ":" + numberToTwoDigitString(remaining_seconds)

}

export function numberToTwoDigitString(n: number): string {
    if (n < 10 && n >= 0){
        return "0" + n
    }
    return "" + n
}

export function modeToColour(mode: string) {

}