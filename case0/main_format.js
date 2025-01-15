function main() {
   return _main.apply(this, arguments);
}

function _main() {
   return (_main = _asyncToGenerator(_regeneratorRuntime().mark((function A() {
      var t, e, r, n, i, o, a, c, s, u, l, d;

      return _regeneratorRuntime().wrap((function (A) {
         for (; ;)
            switch (A.prev = A.next) {
               case 0:
                  postMessageWithContentHeight();
                  delayShowChallengeData();

                  i = document.getElementById('challenge');
                  o = document.getElementById('incident');

                  e = null === i || void 0 === i
                     ? void 0
                     : i.value;
   
                  r = null === o || void 0 === o
                     ? void 0
                     : o.value;

                  setRunStatus("⧗");

                  A.prev = 2;
                  A.next = 8;

                  return runChallenge();

               case 8:
                  a = A.sent;

                  setRunStatus("✔");
                  
                  t = a.token;
                  n = _objectSpread2(
                     _objectSpread2({}, a), {}, {error: ""}
                  );

                  A.next = 21;

                  break;

               case 14:
                  A.prev = 14;
                  A.t0 = A.catch(2);

                  console.error(A.t0);
                  setRunStatus("✖");
                  
                  c = {
                     level: 'critical',
                     build_ts: '2024-10-15T09:22:43.174Z',
                     lib_version: '0.3.2',
                     challenge_id: asString(r, 128),
                     user_agent: asString(window.navigator.userAgent, 384),
                     url: asString(window.location.href, 512),
                      client_ts: (new Date).toISOString()
                  };

                  A.t0 instanceof Error
                     ? (
                        c.message = asString(A.t0.message, 256),
                        s = A.t0.stack,
                        c.stack_trace = asString(
                           "string" == typeof s
                              ? s.split(window.location.href).join("")
                              : s,
                           1024)
                        )
                     : c.message = asString(A.t0, 1024);

                  n = {
                     token: e,
                     fp: "",
                     error: JSON.stringify(c)
                  };

               case 21:
                  u = new URLSearchParams(document.location.search);
                  l = u.get(MODE_PARAM) === MOBILE_MODE;
                  A.next = 25;

                  return sendCandidate(n);

               case 25:
                  d = A.sent;
                  l ? handleMobile(d) : handleWeb(d, t);

               case 27:
               case 'end':
                  return A.stop()
            }
      }), A, null, [[2, 14]])
   })))).apply(this, arguments)
}

window.addEventListener('load', main);
