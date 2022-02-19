import dinamicDifficultyHelper from "../../../../domain/business/helpers/dinamicDifficulty.helper";


describe('Dinamic Difficulty function', () => {
    let block;

    beforeEach(() => {
        block = { timestamp: Date.now(), difficulty: 3 }
    });

    it('Should decrement difficulty', () => {
        expect(dinamicDifficultyHelper(block, block.timestamp + 9000)).toEqual(block.difficulty - 1)
    });

    it('Should increment difficulty', () => {
        expect(dinamicDifficultyHelper(block, block.timestamp - 9000)).toEqual(block.difficulty + 1)
    });

});