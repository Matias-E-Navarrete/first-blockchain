import { MINE_RATE } from "../../constants/blocks.constant";

export default (previousBlock, timestamp) => {
    let { difficulty } = previousBlock;
    
    return previousBlock.timestamp + MINE_RATE > timestamp
        ? difficulty += 1
        : difficulty -= 1;
}