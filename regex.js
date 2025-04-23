const pattern = /^[A-Za-z0-9+\-.]{4,30}@(hilcoe|gmail|yahoo)\.com$/;

const test1 = "Sharen09.Mercle-A@hilcoe.com"; // should pass
const test2 = "ab@hilcoe.com"; // Should fail
const test3 = "should-pass.this+test@gmail.com"; // Should pass

console.log(pattern.test(test1));
console.log(pattern.test(test2));
console.log(pattern.test(test3));
