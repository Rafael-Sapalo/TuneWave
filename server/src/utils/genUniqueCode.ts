export function genUniqueCode() {
    const codeLength = 6;
    let code = '';
    for (let i = 0; i < codeLength; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}
