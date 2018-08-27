"use strict";
const postcss = require("postcss");

function isStyledTagname(node) {
  return (
    (node.tag.type === "Identifier" && node.tag.name === "css") ||
    (node.tag.type === "MemberExpression" && node.tag.object.name === "styled")
  );
}

function isValidRule({ rule, rootLoc }) {
  // check each rule recursively
  const { isValid, loc } = rule.nodes.reduce(
    (map, node) => {
      if (node.type === "rule") {
        return isValidRule({ rule: node, rootLoc });
      }
      return map;
    },
    { isValid: true }
  );

  // if there is any invalid rule, return result
  if (!isValid) {
    return { isValid, loc };
  }

  // check declarations
  const decls = rule.nodes.filter(node => node.type === "decl");
  if (decls.length < 0) {
    return { isValid: true };
  }

  for (let i = 1; i < decls.length; i++) {
    const current = decls[i].prop;
    const prev = decls[i - 1].prop;
    if (current < prev) {
      const loc = {
        start: {
          line: rootLoc.start.line + decls[i - 1].source.start.line - 1,
          column: decls[i - 1].source.start.column - 1
        },
        end: {
          line: rootLoc.start.line + decls[i].source.end.line - 1,
          column: decls[i].source.end.column - 1
        }
      };
      return { isValid: false, loc };
    }
  }

  return { isValid: true };
}

function getNodeStyles(node) {
  const [firstQuasi, ...quasis] = node.quasi.quasis;
  let styles = firstQuasi.value.raw;

  quasis.forEach(({ value, loc }, idx) => {
    const prevLoc = idx === 0 ? firstQuasi.loc : quasis[idx - 1].loc;
    const lineBreaksCount = loc.start.line - prevLoc.end.line;
    const spacesCount = loc.start.column + prevLoc.end.column;
    styles = `${styles}${"\n".repeat(lineBreaksCount)}${" ".repeat(
      spacesCount
    )}${value.raw}`;
  });

  return styles;
}

function create(context) {
  return {
    TaggedTemplateExpression(node) {
      if (isStyledTagname(node)) {
        const styles = getNodeStyles(node);
        try {
          const root = postcss.parse(styles);
          const { isValid, loc } = isValidRule({
            rule: root,
            rootLoc: node.loc
          });
          if (!isValid) {
            context.report({ node, messageId: "sort-styles", loc });
          }
        } catch (e) {
          return true;
        }
      }
    }
  };
}

module.exports = {
  meta: {
    docs: {
      description: "Styles are sorted alphabetically.",
      category: "Fill me in",
      recommended: false
    },
    messages: {
      "sort-styles": "Styles should be sorted alphabetically."
    },
    fixable: "code"
  },
  create
};
