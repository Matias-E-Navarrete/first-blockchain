import Blockchain, { Block } from "../../../domain/entity/index";

describe('Entity Index ', () => {
    it('Should be export', () => {
        expect(Block).not.toEqual(undefined)
        expect(Blockchain).not.toEqual(undefined)
    });
});