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

function areSetsEqual(a: TernaryStringSet, b: TernaryStringSet): boolean {
    let aArray: string[] = a.toArray()
    let bArray: string[] = b.toArray()
    if (aArray.length != bArray.length) {
        return false
    }
    for (let s of aArray) {
        if (bArray.indexOf(s) < 0) {
            return false
        }
    }
    return true
}

function areStatsEqual(a: TernaryStringSet, b: TernaryStringSet): boolean {
    let aStats = a.stats
    let bStats = b.stats
    if (aStats.size != bStats.size) {
        game.splash(`Sizes different: ${aStats.size}, ${bStats.size}`)
        return false
    }
    if (aStats.nodes != bStats.nodes) {
        game.splash(`Nodes different: ${aStats.nodes}, ${bStats.nodes}`)
        return false
    }
    if (aStats.compact != bStats.compact) {
        game.splash(`Compact different: ${aStats.compact}, ${bStats.compact}`)
        return false
    }
    if (aStats.depth != bStats.depth) {
        game.splash(`Depths different: ${aStats.depth}, ${bStats.depth}`)
        return false
    }
    if (aStats.breadth.length != bStats.breadth.length) {
        game.splash(`Breadths different sizes: ${aStats.breadth.length}, ${bStats.breadth.length}`)
        return false
    }
    for (let i: number = 0; i < aStats.breadth.length; i++) {
        if (aStats.breadth[i] != bStats.breadth[i]) {
            game.splash(`Breadths level ${i} different: ${aStats.breadth[i]}, ${bStats.breadth[i]}`)
            return false
        }
    }
    if (aStats.minCodePoint != bStats.minCodePoint) {
        game.splash(`Min code points different: ${aStats.minCodePoint}, ${bStats.minCodePoint}`)
        return false
    }
    if (aStats.maxCodePoint != bStats.maxCodePoint) {
        game.splash(`Max code points different, ${aStats.maxCodePoint}, ${bStats.maxCodePoint}`)
        return false
    }
    return true
}