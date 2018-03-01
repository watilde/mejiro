const cluster = require('cluster')
const test = require('tap').test
const Mejiro = require('../lib')
const fixture = ['one', 'two', 'three', 'four', 'five']

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'one')
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 200, 'two')
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 300, 'three')
})

const promise4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 400, 'four')
})

const promise5 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'five')
})

if (cluster.isMaster) {
  test((t) => {
    t.plan(1)
    Mejiro.all([promise1, promise2, promise3, promise4, promise5])
      .then((values) => {
        t.equal(JSON.stringify(values), JSON.stringify(fixture))
      })
  })
} else {
  Mejiro.all([promise1, promise2, promise3, promise4, promise5])
}
