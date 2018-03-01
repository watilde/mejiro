# Mejiro
Promise.all and Promise.race in Clusters

## Example
### Mejiro.all
```js
const Mejiro = require('mejiro')
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 200, 'two');
});

Mejiro.all([promise1, promise2])
  .then((values) => {
    // values: ['one', 'two']
  })
```

### Mejiro.race
```js
const Mejiro = require('mejiro')
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 200, 'two');
});

Mejiro.race([promise1, promise2])
  .then((values) => {
    // values: 'one'
  })
```
