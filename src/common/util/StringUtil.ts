
export default class StringUtil {

    // modified version of function found here: https://j11y.io/snippets/wordwrap-for-javascript/
    public static wordwrap = (str: string, width: number = 50, trim: boolean = true): string[] => {

        let cut = true;

        if (!str) { throw new TypeError('Input string required'); }

        var regex = '.{1,' + width + '}(\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\S+?(\s|$)');

        var strMatch = str.match(RegExp(regex, 'g'));

        if(trim) {

            return strMatch.map((elem) => {

                return elem.trim();
            });
        }
        else {

            return strMatch;
        }
    }
}