function postMessageWithContentHeight() {
   const height = document.documentElement.scrollHeight
   const challengeElement = document.getElementById('challenge')
   const incidentElement = document.getElementById('incident')

   incidentElement.value = Date.now()
   challengeElement.value = height
   challengeElement.textContent = `${height}`
}

function delayShowChallengeData() {
   const challengeElement = document.getElementById('challenge')

   challengeElement.style.display = 'block'

   setTimeout(() => {
      challengeElement.style.display = 'none'
   }, 15000)
}

function setRunStatus(status) {
   const statusElement = document.getElementById('status')

   statusElement.textContent = status
}

async function runChallenge() {
   return new Promise((resolve, reject) => {
      const challengeElement = document.getElementById('challenge')
      const inputField = document.getElementById('input-field')
      const crtTime = document.getElementById('incident').value
      const token = challengeElement.value

      const intervalId = setInterval(() => {
         const inputValue = inputField.value

         if (inputValue == token) {
            clearInterval(intervalId)
            resolve({ token })
         }

         if (Date.now() - crtTime > 15000) {
            clearInterval(intervalId)
            reject(new Error('timeout'))
         }
      }, 100)
   })
}

async function sendCandidate(data) {
   const res = data.error ? 'Error' : 'Successfull'

   return Promise.resolve(res)
}

const asString = (str, num) => String(str).slice(0, num)
const handleMobile = res => alert(res)
const handleWeb = (res, token) => alert(`${res}: ${token}`)

const MODE_PARAM = 'mode'
const MOBILE_MODE = window.innerWidth < window.innerHeight
   ? 'mobile'
   : 'web'