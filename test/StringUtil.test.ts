import StringUtil from "../src/common/util/StringUtil";

export default (function() {

    describe('StringUtil class', function() {

        describe('wordwrap method', function() {

            it('should return input string unmodified as first element in output array if length less than threshold', function() {

                let wrappedString = StringUtil.wordwrap('String less than 50 chars', 50);

                expect(wrappedString.length).toBe(1);
                expect(wrappedString[0]).toBe('String less than 50 chars');
            });

            it('should return multiple strings in the output array if input string is longer than threshold', function() {

                let wrappedString = StringUtil.wordwrap('String greater than 20 chars', 20);

                expect(wrappedString.length).toBe(2);
                expect(wrappedString[0]).toBe('String greater than');
                expect(wrappedString[1]).toBe('20 chars');

                let wrappedString2 = StringUtil.wordwrap('String significantly greater than 20 characters', 20);

                expect(wrappedString2.length).toBe(3);
                expect(wrappedString2[0]).toBe('String significantly');
                expect(wrappedString2[1]).toBe('greater than 20');
                expect(wrappedString2[2]).toBe('characters');
            });

            it('should split words if and only if it is impossible to break at a space threshold', function() {

                let wrappedString = StringUtil.wordwrap('01234567890', 10);

                expect(wrappedString.length).toBe(2);
                expect(wrappedString[0]).toBe('0123456789');
                expect(wrappedString[1]).toBe('0');

                let wrappedString2 = StringUtil.wordwrap('01234567890 12', 10);

                expect(wrappedString2.length).toBe(2);
                expect(wrappedString2[0]).toBe('0123456789');
                expect(wrappedString2[1]).toBe('0 12');

                let wrappedString3 = StringUtil.wordwrap('01234567890 123456789', 10);

                expect(wrappedString3.length).toBe(3);
                expect(wrappedString3[0]).toBe('0123456789');
                expect(wrappedString3[1]).toBe('0');
                expect(wrappedString3[2]).toBe('123456789');
            });
        });
    });
}());