const cluster = require('cluster')
const test = require('tape')
const Mejiro = require('../lib')

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'one')
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 200, 'two')
})

if (cluster.isMaster) {
  test((t) => {
    t.plan(1)
    Mejiro.race([promise1, promise2]).then((values) => {
      t.equal(values, 'one')
    })
  })
} else {
  Mejiro.race([promise1, promise2])
}
