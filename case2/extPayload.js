const fs = require('fs')
const acorn = require('acorn')

const inputFilePath = './main.js' // исходник
const outputFilePath = './payload.js' // результат

function extPayload(filePath) {
   const code = fs.readFileSync(filePath, 'utf8')
   const ast = acorn.parse(code, {ecmaVersion: 2020})
   const result = new Set()

   !function extNode(node) {
      if (node.type == 'CallExpression') {
         const funcName = node.callee.name

         // проверка на обёртки Babel
         if (funcName && !funcName.startsWith('_')) {
            result.add(funcName)
         }
      }

      for (let key in node) {
         if (node[key] && typeof node[key] == 'object') {
            extNode(node[key])
         }
      }
   }(ast)

   return result
}

const payload = [...extPayload(inputFilePath)]

fs.writeFileSync(
   outputFilePath,
   JSON.stringify(payload, null, 3)
)
