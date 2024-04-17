export function checkTypes(obj: any, type: any) {
    if (typeof obj !== type) {
        return false;
    }
    return true;
}

