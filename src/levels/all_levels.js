import level1 from './level1';
import level2 from './level2';
import level3 from './level3';
import level4 from './level4';
import level5 from './level5';
import level6 from './level6';
import level7 from './level7';
import LevelBuilder from './level_builder';

const level8 = new LevelBuilder(40000, 700);
level8.makeLevel();

export default [level1, level2, level3, level4, level5, level6, level7, level8.level];