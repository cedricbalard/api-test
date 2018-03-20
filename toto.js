// function resolveAfter2Seconds(x) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(x);
//     }, 2000);
//   });
// }
//
// async function add1(x) {
//   const a = await resolveAfter2Seconds(20);
//   const b = await resolveAfter2Seconds(30);
//   return x + a + b;
// }
//
// add1(10).then(v => {
//   console.log(v);  // affiche 60 après 4 secondes.
// });
//
// async function add2(x) {
//   const a = resolveAfter2Seconds(20);
//   const b = resolveAfter2Seconds(30);
//   return x + await a + await b;
// }
//
// add2(10).then(v => {
//   console.log(v);  // affiche 60 après 2 secondes.
// });

var async = require ('async');

var configs = [
  {
    val : 'a'
  },
  {
    val : 'b'
  }
];


async.each(configs, (c, nextConfig) => {

  console.log(' --> check config c : ', c);

  setTimeout(() => {

    console.log(' --> setTimeout ... this : ', this)
    nextConfig();

  }, 1000);

}, function () {

  console.log(' --> end ')
});
