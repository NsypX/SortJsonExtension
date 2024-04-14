import { INPUTS_MOCKS } from '../__mocks__/sortHelpers.mocks';
import { parseMakeupJson } from '../sortHelpers';

import * as assert from 'assert';

import * as vscode from 'vscode';

suite('tests for sortHelpers', () => {
  vscode.window.showInformationMessage('Start all tests.');

  const { expectedValue, input } = INPUTS_MOCKS.SIMPLE_OBJ;
  test('should parse basic object and sort it.', () => {
    const result = parseMakeupJson(input);

    assert.equal(result,expectedValue);
  });

  test.only('should parse basic object with nested object and sort it.', () => {
    const { expectedValue, input } = INPUTS_MOCKS.NESTED_OBJ;

    const result = parseMakeupJson(input);

    assert.equal(result,expectedValue);
  });
});
