/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function(n,map={}) {
    if(n==0){
        return 0
    }
    if(n==1||n==2){
        return 1
    }
        map[n] = tribonacci(n-3,map)+tribonacci(n-2,map)+tribonacci(n-1,map)
        return map[n]
    
};
console.log(tribonacci(4))