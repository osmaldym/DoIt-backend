export function excluded(...data: Array<string | string[]>) {
    let arr: Array<string> = [];

    for (const el of data)
        if (Array.isArray(data)) arr = arr.concat(el);
        else arr.push(data);
    
    arr = arr.map((el) => {
        if (!el.startsWith('-')) el = '-' + el;
        return el;
    })

    return arr;
}