import TextEntryComponent from './../src/ui/TextEntryComponent';

describe('TextEntryComponent class', function() {

    describe('constructor method', function() {

        it('should default to a single cursor with an empty string value on construction', function() {

            let textEntry = new TextEntryComponent();
            
            let viewGrid = textEntry.getView();
            let textValue = textEntry.getValue();

            expect(viewGrid.getWidth()).toBe(1);
            expect(viewGrid.getHeight()).toBe(1);
            expect(viewGrid.get(0, 0).icon).toBe(' '); // cursor
            expect(textValue).toBe('');
        });

        it('should start with the initial value passed into the constructor if input is valid', function() {

            let textEntry = new TextEntryComponent('Testing-_./');

            let viewGrid = textEntry.getView();
            let textValue = textEntry.getValue();

            expect(viewGrid.getWidth()).toBe(12);
            expect(viewGrid.getHeight()).toBe(1);
            expect(viewGrid.get(0, 0).icon).toBe('T');
            expect(viewGrid.get(11, 0).icon).toBe(' '); // cursor
            expect(textValue).toBe('Testing-_./');
        });

        it('should revert to single cursor if invalid input is provided', function() {

            let textEntry = new TextEntryComponent('Testing!@#');

            let viewGrid = textEntry.getView();
            let textValue = textEntry.getValue();

            expect(viewGrid.getWidth()).toBe(1);
            expect(viewGrid.getHeight()).toBe(1);
            expect(viewGrid.get(0, 0).icon).toBe(' '); // cursor
            expect(textValue).toBe('');
        });
    });

    describe('processKey method', function() {

        it('should add valid characters to underlying value and view grid', function() {

            let textEntry = new TextEntryComponent();
            textEntry.processKey('H');
            textEntry.processKey('e');
            textEntry.processKey('l');
            textEntry.processKey('l');
            textEntry.processKey('o');
            textEntry.processKey('-');
            textEntry.processKey('_');
            textEntry.processKey('.');
            textEntry.processKey('/');

            let viewGrid = textEntry.getView();
            let textValue = textEntry.getValue();
            
            expect(viewGrid.getWidth()).toBe(10);
            expect(viewGrid.getHeight()).toBe(1);
            expect(viewGrid.get(0, 0).icon).toBe('H');
            expect(viewGrid.get(9, 0).icon).toBe(' '); // cursor
            expect(textValue).toBe('Hello-_./');
        });

        it('should delete last character if \'Backspace\' received', function() {

            let textEntry = new TextEntryComponent('Testing');
            
            let viewGrid = textEntry.getView();
            let textValue = textEntry.getValue();

            expect(viewGrid.getWidth()).toBe(8);
            expect(viewGrid.getHeight()).toBe(1);
            expect(viewGrid.get(0, 0).icon).toBe('T');
            expect(viewGrid.get(6, 0).icon).toBe('g');
            expect(viewGrid.get(7, 0).icon).toBe(' '); // cursor
            expect(textValue).toBe('Testing');

            textEntry.processKey('Backspace');

            let viewGrid2 = textEntry.getView();
            let textValue2 = textEntry.getValue();

            expect(viewGrid2.getWidth()).toBe(7);
            expect(viewGrid2.getHeight()).toBe(1);
            expect(viewGrid2.get(0, 0).icon).toBe('T');
            expect(viewGrid2.get(5, 0).icon).toBe('n');
            expect(viewGrid2.get(6, 0).icon).toBe(' '); // cursor
            expect(textValue2).toBe('Testin');
        });
    });
});