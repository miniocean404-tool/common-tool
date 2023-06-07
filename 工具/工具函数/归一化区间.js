// 真正在 [-1,1] 之间的归一化函数
function normalize(target, min = -1, max = 1) {
    let arrMax = Math.max(...target)
    let arrMin = Math.min(...target)
    arrMax = arrMax > Math.abs(arrMin) ? arrMax : Math.abs(arrMin)
    arrMin = -arrMax

    return target.map((t) => {
        return ((max - min) * (t - arrMin)) / (arrMax - arrMin) + min
    })
}


// 将数组的范围一个范围之间
export function normalizeLow(arr) {
    let num = 0

    for (let i = 0; i < arr.length; i++) {
        num += arr[i] * arr[i]
    }

    const middle = Math.sqrt(num)

    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i] / middle
    }

    return arr
}
