"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortHelpers_mocks_1 = require("../__mocks__/sortHelpers.mocks");
const sortHelpers_1 = require("../sortHelpers");
describe('tests for sortHelpers', () => {
    const { expectedValue, input } = sortHelpers_mocks_1.INPUTS_MOCKS.SIMPLE_OBJ;
    it('should parse basic object and sort it.', () => {
        const result = (0, sortHelpers_1.parseMakeupJson)(input);
        expect(result).toBe(expectedValue);
    });
    it.only('should parse basic object with nested object and sort it.', () => {
        const { expectedValue, input } = sortHelpers_mocks_1.INPUTS_MOCKS.NESTED_OBJ;
        const result = (0, sortHelpers_1.parseMakeupJson)(input);
        expect(result).toBe(expectedValue);
    });
});
//# sourceMappingURL=sortHelpers.test.js.map