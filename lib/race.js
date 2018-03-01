const cluster = require('cluster')
const numCPUs = require('os').cpus().length

module.exports = (promises) => {
  return new Promise((resolve, reject) => {
    const length = promises.length
    const clusters = numCPUs > length ? length : numCPUs
    if (cluster.isMaster) {
      let workers = []
      for (let i = 0; i < clusters; i++) {
        let worker = cluster.fork()
        workers.push(worker)
        worker.send({index: i})
        worker.on('message', (msg) => {
          workers.forEach((w) => {
            w.kill()
          })
          resolve(msg.values)
        })
      }
    } else {
      process.on('message', (msg) => {
        const index = msg.index
        const begin = Math.round(length / clusters * index)
        const end = Math.round(length / clusters * (index + 1))
        let all = promises.slice(begin, end)
        Promise.race(all).then((values) => {
          process.send({index: index, values: values})
        }).catch(reject)
      })
    }
  })
}
