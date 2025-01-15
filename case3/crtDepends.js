const fs = require('fs')
const acorn = require('acorn')

const inputFilePath = './main.js' // исходник

function crtDepends(filePath) {
   const code = fs.readFileSync(filePath, 'utf8')
   const ast = acorn.parse(code, {ecmaVersion: 2020})
   const result = []

   !function extNode(node) {
      if (node.type == 'CallExpression') {
         const funcName = node.callee.name
         
         funcName && result.push(funcName)
      }

      for (let key in node) {
         if (node[key] && typeof node[key] == 'object') {
            extNode(node[key])
         }
      }
   }(ast)

   return result
}

const ctrlFlow = crtDepends(inputFilePath)
const dependencies = [...new Set(ctrlFlow)]

fs.writeFileSync(
   './controlFlow.js',
   JSON.stringify(ctrlFlow, null, 3)
)

fs.writeFileSync(
   './dependencies.js',
   JSON.stringify(dependencies, null, 3)
)
