import { test } from '@playwright/test';

test.describe('caret behavior (real browsers)', () => {
  test.fixme('rapid typing keeps caret at end');
  test.fixme('backspace across a literal removes literal + previous char');
  test.fixme('mid-string insert keeps caret after inserted char');
  test.fixme('paste with junk chars formats and puts caret at end');
  test.fixme('select-all + type replaces value');
  test.fixme('React controlled input sees formatted value');
});
