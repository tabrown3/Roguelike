import InteractiveMenu from "./../src/ui/InteractiveMenu";

describe('InteractiveMenu class', function() {

    let interactiveMenu: InteractiveMenu;
    let mockFuncs = <any>{
        option1: () => { },
        option2: () => { },
        option3: () => { }
        
    };

    beforeEach(function() {

        spyOn(mockFuncs, 'option1');
        spyOn(mockFuncs, 'option2');
        spyOn(mockFuncs, 'option3');

        interactiveMenu = new InteractiveMenu([
            {
                message: 'Option 1',
                action: mockFuncs.option1
            },
            {
                message: 'Option 2',
                action: mockFuncs.option2
            },
            {
                message: 'Option 3',
                action: mockFuncs.option3
            }
        ]);
    });

    describe('executeMenuOption method', function() {

        it('should execute the default option in the menu each time it is called, since selector is not being moved', function() {

            expect(mockFuncs.option1).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(0);

            interactiveMenu.executeMenuOption();

            expect(mockFuncs.option1).toHaveBeenCalledTimes(1);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(0);

            interactiveMenu.executeMenuOption();
            interactiveMenu.executeMenuOption();

            expect(mockFuncs.option1).toHaveBeenCalledTimes(3);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(0);
        });
    });

    describe('moveSelectorDown method', function() {

        it('should move selector down one to the second option in the menu and execute', function() {

            expect(mockFuncs.option1).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(0);

            interactiveMenu.moveSelectorDown();
            interactiveMenu.executeMenuOption();

            expect(mockFuncs.option1).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(1);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(0);

            interactiveMenu.executeMenuOption();
            interactiveMenu.executeMenuOption();
            
            expect(mockFuncs.option1).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(3);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(0);
        });

        it('should move selector to last option and execute', function() {

            expect(mockFuncs.option1).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(0);

            interactiveMenu.moveSelectorDown();
            interactiveMenu.moveSelectorDown();
            interactiveMenu.executeMenuOption();

            expect(mockFuncs.option1).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(1);
        });

        it('should not move below last option in menu', function() {

            expect(mockFuncs.option1).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(0);

            interactiveMenu.moveSelectorDown();
            interactiveMenu.moveSelectorDown();
            interactiveMenu.moveSelectorDown();
            interactiveMenu.moveSelectorDown();
            interactiveMenu.moveSelectorDown();
            interactiveMenu.executeMenuOption();

            expect(mockFuncs.option1).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(1);
        });
    });

    describe('moveSelectorUp method', function() {

        it('should not move selector above first option in menu', function() {

            expect(mockFuncs.option1).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(0);

            interactiveMenu.executeMenuOption();

            expect(mockFuncs.option1).toHaveBeenCalledTimes(1);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(0);

            interactiveMenu.moveSelectorUp();
            interactiveMenu.moveSelectorUp();
            interactiveMenu.moveSelectorUp();
            interactiveMenu.moveSelectorUp();
            interactiveMenu.executeMenuOption();

            expect(mockFuncs.option1).toHaveBeenCalledTimes(2);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(0);
        });

        it('should move selector up once each time called, assuming not at the top', function() {

            expect(mockFuncs.option1).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(0);

            interactiveMenu.moveSelectorDown();
            interactiveMenu.moveSelectorDown();
            interactiveMenu.executeMenuOption();

            expect(mockFuncs.option1).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(1);

            interactiveMenu.moveSelectorUp();
            interactiveMenu.executeMenuOption();

            expect(mockFuncs.option1).toHaveBeenCalledTimes(0);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(1);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(1);

            interactiveMenu.moveSelectorUp();
            interactiveMenu.executeMenuOption();

            expect(mockFuncs.option1).toHaveBeenCalledTimes(1);
            expect(mockFuncs.option2).toHaveBeenCalledTimes(1);
            expect(mockFuncs.option3).toHaveBeenCalledTimes(1);
        });
    });
});