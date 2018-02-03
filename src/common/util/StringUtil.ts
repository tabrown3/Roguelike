
export default class StringUtil {

    // modified version of function found here: https://j11y.io/snippets/wordwrap-for-javascript/
    public static wordwrap = (str: string, width: number = 50, trim: boolean = true, allowJagged: boolean = true): string[] => {

        if (!str) { throw new TypeError('Input string required'); }

        var regex = '.{1,' + width + '}(\\s|$)|.{' + width + '}|.+$';

        var strMatch = str.match(RegExp(regex, 'g'));

        let unpaddedMatch: string[];

        if(trim) {

            unpaddedMatch = strMatch.map((elem) => {

                return elem.trim();
            });
        }
        else {

            unpaddedMatch = strMatch;
        }

        if(allowJagged) {

            return unpaddedMatch;
        }
        else {

            let largestLength = -Infinity; // literally any number will be higher initially
            let paddedMatch = [...unpaddedMatch];

            for (let inStr of paddedMatch) {

                largestLength = Math.max(largestLength, inStr.length);
            }

            for (let matchInd in paddedMatch) {

                const curString = paddedMatch[matchInd];

                if (curString.length < largestLength) {
                    paddedMatch[matchInd] = StringUtil.padEnd(curString, largestLength);
                }
            }

            return paddedMatch;
        }
    }

    // polyfill found on MDN for the String.prototype.padEnd method
    public static padEnd(inStr: string, targetLength: number, padString?: string) {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (inStr.length > targetLength) {
            return String(inStr);
        }
        else {
            targetLength = targetLength - inStr.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return String(inStr) + padString.slice(0, targetLength);
        }
    }
}