export const excludeFields = <T, Key extends keyof T>(user: T, keys: Key[]) => {
    const clone = { ...user }

    for (let key of keys) {
        delete clone[key]
    }

    return clone
}