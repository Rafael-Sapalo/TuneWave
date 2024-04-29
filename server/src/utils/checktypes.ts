export function checkTypes(obj: any, type: any) {
    if (typeof obj !== type) {
        return false;
    }
    return true;
}

export const isStrongPassword = (password: string) => {
    const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    return strongPassword.test(password);
};
