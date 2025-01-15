async function main() {
   postMessageWithContentHeight()
   delayShowChallengeData()
   setRunStatus('⧗')

   const valueChallenge = document.getElementById('challenge')?.value
   const valueIncident = document.getElementById('incident')?.value
   const urlParams = new URLSearchParams(document.location.search)
   const mobileMode = urlParams.get(MODE_PARAM) == MOBILE_MODE
   const result = {error: ''}
   let token = ''

   try {
      const challenge = await runChallenge()
      token = challenge.token

      Object.assign(result, challenge)

      setRunStatus('✔')

   } catch (err) {
      console.error(err)

      setRunStatus('✖')

      const error = {
         level: 'critical',
         build_ts: '2024-10-15T09:22:43.174Z',
         lib_version: '0.3.2',
         challenge_id: asString(valueIncident, 128),
         user_agent: asString(window.navigator.userAgent, 384),
         url: asString(window.location.href, 512),
         client_ts: (new Date).toISOString()
      }

      if (err instanceof Error) {
         const {stack} = err
         const stackTrace = typeof stack == 'string'
            ? stack.split(window.location.href).join('')
            : stack

         error.message = asString(err.message, 256)
         error.stack_trace = asString(stackTrace, 1024)

      } else {
         error.message = asString(err, 1024)
      }

      Object.assign(result, {
         token: valueChallenge,
         fp: '',
         error: JSON.stringify(error)
      })

   } finally {
      sendCandidate(result)
         .then(res => mobileMode ? handleMobile(res) : handleWeb(res, token))
         .catch(main)
   }
}

window.addEventListener('load', main)
