/**
 * @fileoverview Styles are sorted alphabetically.
 * @author siffogh
 */
"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require("../../../lib/rules/sort-declarations-alphabetically");
const RuleTester = require("eslint").RuleTester;

const parserOptions = { ecmaVersion: 8, sourceType: "module" };

// ------------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------------8"
var ruleTester = new RuleTester();

ruleTester.run("sort-declarations-alphabetically", rule, {
  valid: [
    {
      code: "const button = styled.button`height: 200px; width: 300px;`",
      parserOptions
    },
    {
      code: "const button = styled(Button)`height: 200px; width: 300px;`",
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
        color: \${({ isBlue }) => (isBlue ? "blue" : "red")};
        height: 200px; 
        width: 300px;\``,
      parserOptions
    },
    {
      code: `const button = styled.button\`
        height: 200px; 
        stroke: \${Colors => Colors.selections};
        width: 300px;\``,
      parserOptions
    },
    {
      code: `const button = styled.button\`
        border: 1px solid
          \${({ isBlue }) => (isBlue ? "blue" : "red")};
        height: 200px;
        width: 300px;\``,
      parserOptions
    },
    {
      code: `
      import styled from 'styled-components';


      const button = styled.button\`
        border: 1px solid
          \${({ isBlue }) => (isBlue ? "blue" : "red")};
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
          messageId: "sort-declarations-alphabetically"
        }
      ],
      output: "const button = styled.button`height: 200px; width: 300px;`"
    },
    {
      code: "const button = styled(Button)`width: 300px; height: 200px;`",
      parserOptions,
      errors: [
        {
          messageId: "sort-declarations-alphabetically"
        }
      ],
      output: "const button = styled(Button)`height: 200px; width: 300px;`"
    },
    {
      code: "const button = css`width: 300px; height: 200px;`",
      parserOptions,
      errors: [
        {
          messageId: "sort-declarations-alphabetically"
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
          messageId: "sort-declarations-alphabetically"
        }
      ],
      output: `const button = styled.button\`
        height: 200px; 
        width: 300px;\``
    },
    {
      code: `const button = styled.button\`
        height: 200px;
        color: \${({ isBlue }) => (isBlue ? "blue" : "red")};
        width: 300px;\``,
      parserOptions,
      errors: [
        {
          messageId: "sort-declarations-alphabetically"
        }
      ],
      output: `const button = styled.button\`
        color: \${({ isBlue }) => (isBlue ? "blue" : "red")};
        height: 200px;
        width: 300px;\``
    },
    {
      code: `const foo = styled.div\`
        stroke: \${Colors => Colors.selections};
        color: blue;
      \`;`,
      parserOptions,
      errors: [
        {
          messageId: "sort-declarations-alphabetically"
        }
      ],
      output: `const foo = styled.div\`
        color: blue;
        stroke: \${Colors => Colors.selections};
      \`;`
    },
    {
      code: `const button = styled.button\`
        width: 300px;
        height: 200px;
        border: 1px solid
          \${({ isBlue }) => (isBlue ? "blue" : "red")};\``,
      parserOptions,
      errors: [
        {
          messageId: "sort-declarations-alphabetically"
        }
      ],
      output: `const button = styled.button\`
        border: 1px solid
          \${({ isBlue }) => (isBlue ? "blue" : "red")};
        height: 200px;
        width: 300px;\``
    },
    {
      code: `
      import styled from 'styled-components';

      
      const button = styled.button\`
        height: 200px;
        border: 1px solid
          \${({ isBlue }) => (isBlue ? "blue" : "red")};
        width: 300px;\``,
      parserOptions,
      errors: [
        {
          messageId: "sort-declarations-alphabetically"
        }
      ],
      output: `
      import styled from 'styled-components';

      
      const button = styled.button\`
        border: 1px solid
          \${({ isBlue }) => (isBlue ? "blue" : "red")};
        height: 200px;
        width: 300px;\``
    },
    {
      code: `
        export const foo = styled.div\`
          height: 100%;
          top: 0;
          position: absolute;
          width: 100%;
        
          .op-selectable:hover {
            cursor: pointer;
          }
        \`;`,
      parserOptions,
      errors: [
        {
          messageId: "sort-declarations-alphabetically"
        }
      ],
      output: `
        export const foo = styled.div\`
          height: 100%;
          position: absolute;
          top: 0;
          width: 100%;
        
          .op-selectable:hover {
            cursor: pointer;
          }
        \`;`
    },
    {
      code: `
        export const foo = styled.div\`
          flex-grow: 1;
          .op-selected .djs-outline {
            stroke-width: 3px;
            fill: \${themeStyle({
              dark: "rgba(58, 82, 125, 0.5)",
              light: "rgba(189, 212, 253, 0.5)"
            })} !important;
          }\`;`,
      parserOptions,
      errors: [
        {
          messageId: "sort-declarations-alphabetically"
        }
      ],
      output: `
        export const foo = styled.div\`
          flex-grow: 1;
          .op-selected .djs-outline {
            fill: \${themeStyle({
              dark: "rgba(58, 82, 125, 0.5)",
              light: "rgba(189, 212, 253, 0.5)"
            })} !important;
            stroke-width: 3px;
          }\`;`
    }
  ]
});
