/**
 * @fileoverview Styles are sorted alphabetically.
 * @author siffogh
 */
"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require("../../../lib/rules/sort-rules-alphabetically");
const RuleTester = require("eslint").RuleTester;

const parserOptions = { ecmaVersion: 8, sourceType: "module" };

// ------------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------------8"
var ruleTester = new RuleTester();

ruleTester.run("sort-rules-alphabetically", rule, {
  valid: [
    {
      code: "const button = styled.button`height: 200px; width: 300px;`",
      parserOptions
    },
    {
      code: "const button = css`height: 200px; width: 300px;`",
      parserOptions
    },
    {
      code: `const button = styled.button\`
        height: 200px; 
        width: 300px;\``,
      parserOptions
    },
    {
      code: `const button = styled.button\`
        color: ${({ isBlue }) => (isBlue ? "blue" : "red")};
        height: 200px; 
        width: 300px;\``,
      parserOptions
    },
    {
      code: `const button = styled.button\`
        border: 1px solid
          ${({ isBlue }) => (isBlue ? "blue" : "red")};
        height: 200px;
        width: 300px;\``,
      parserOptions
    }
  ],

  invalid: [
    {
      code: "const button = styled.button`width: 300px; height: 200px;`",
      parserOptions,
      errors: [
        {
          messageId: "sort-rules-alphabetically"
        }
      ],
      output: "const button = styled.button`height: 200px; width: 300px;`"
    },
    {
      code: "const button = css`width: 300px; height: 200px;`",
      parserOptions,
      errors: [
        {
          messageId: "sort-rules-alphabetically"
        }
      ],
      output: "const button = css`height: 200px; width: 300px;`"
    },
    {
      code: `const button = styled.button\`
        width: 300px; 
        height: 200px;\``,
      parserOptions,
      errors: [
        {
          messageId: "sort-rules-alphabetically"
        }
      ],
      output: `const button = styled.button\`
        height: 200px; 
        width: 300px;\``
    },
    {
      code: `const button = styled.button\`
        height: 200px;
        color: ${({ isBlue }) => (isBlue ? "blue" : "red")};
        width: 300px;\``,
      parserOptions,
      errors: [
        {
          messageId: "sort-rules-alphabetically"
        }
      ],
      output: `const button = styled.button\`
        color: ${({ isBlue }) => (isBlue ? "blue" : "red")};
        height: 200px;
        width: 300px;\``
    },
    {
      code: `const button = styled.button\`
        width: 300px;
        height: 200px;
        border: 1px solid
          ${({ isBlue }) => (isBlue ? "blue" : "red")};\``,
      parserOptions,
      errors: [
        {
          messageId: "sort-rules-alphabetically"
        }
      ],
      output: `const button = styled.button\`
        border: 1px solid
          ${({ isBlue }) => (isBlue ? "blue" : "red")};
        height: 200px;
        width: 300px;\``
    }
  ]
});
