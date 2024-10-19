function areEquivalent(a: string[], b: string[]): boolean {
    if (a.length != b.length) {
        return false
    }
    for (let s of a) {
        if (b.indexOf(s) == -1) {
            return false
        }
    }
    return true
}
