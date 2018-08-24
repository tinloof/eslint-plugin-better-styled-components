/**
 * @fileoverview Styles are sorted alphabetically.
 * @author siffogh
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/sort-styles");
const RuleTester = require("eslint").RuleTester;
const fs = require('fs');
const path = require('path');

const parserOptions = { ecmaVersion: 8, sourceType: 'module'};
    

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const validCode = fs.readFileSync(path.resolve(__dirname, 'valid.txt'), 'utf-8');
const invalidCode = fs.readFileSync(path.resolve(__dirname, 'invalid.txt'), 'utf-8');
var ruleTester = new RuleTester();
ruleTester.run("sort-styles", rule, {

    valid: [{
        code: validCode,
        parserOptions
    }],

    invalid: [
        {
            code: invalidCode,
            parserOptions,
            errors: [{
                messageId: "avoidMe"
            }]
        }
    ]
});
