/**
 * @fileoverview Styles are sorted alphabetically.
 * @author siffogh
 */
"use strict";
const postcss = require('postcss');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const isStyledTagname = node => node.tag.type === 'Identifier' && ['styled', 'css'].includes(node.tag.name);

var areSortedProps = props => {
    if(props.length < 0) {
        return true;
    }

    for(let i = 1; i<props.length; i++) {
        const current = props[i];
        const prev = props[i-1];
        if(current < prev) {
            return false;
        }
    }

    return true;
}

var isValidRule = (rule, isValid = true) => {
    const props = rule.nodes.filter(node => node.type === 'decl').map(({prop}) => prop);
    isValid = isValid && areSortedProps(props);
    rule.nodes.forEach(node => {
        if(node.type === 'rule') {
            isValid = isValid && isValidRule(node);
        }
    });
    return isValid;
}
module.exports = {
    meta: {
        docs: {
            description: "Styles are sorted alphabetically.",
            category: "Fill me in",
            recommended: false
        },
        fixable: null, // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function (context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
			TaggedTemplateExpression(node) {
				if(isStyledTagname(node)) {
                    const isValid = node.quasi.quasis.reduce((isValid, {value}) => {
                        const root = postcss.parse(value.raw);
                        return isValid && isValidRule(root);
                    }, true);
                    if(!isValid){
                  		context.report({node, message: 'Should be sorted'});
                    }
				}
			}

        };
    }
};