namespace Balance {
    export function run(): boolean {
        let test: TernaryStringSet
        let allPassed: boolean = true
        
        // balance() improves bad tree structure
        test = new TernaryStringSet()
        for (let s of ShortEnglishList.words) {
            test.add(s)
        }
        const badDepth: number = test.stats.depth
        test.balance()
        const goodDepth: number = test.stats.depth
        
        if (!areEquivalent(ShortEnglishList.words, test.toArray())) {
            game.splash("Balance test 1a failed.")
            allPassed = false
        }
        if (goodDepth >= badDepth) {
            game.splash(`Balance test 1b failed. Bad depth: ${badDepth}, good depth: ${goodDepth}.`)
            allPassed = false
        }
        if (test.has("")) {
            game.splash("Balance test 1c failed.")
            allPassed = false
        }

        // balance() preserves contents
        test = new TernaryStringSet()
        const words: string[] = [
            "",
            "a",
            "ape",
            "aphid",
            "aphids",
            "bee",
            "bees",
            "cat",
            "cats",
        ]

        // Add words in the worst possible order.
        for (let s of words) {
            test.add(s)
        }
        test.balance()
        if (!areEquivalent(words, test.toArray())) {
            game.splash("Balance test 2 failed.")
            allPassed = false
        }

        // balance() of empty tree is safe.
        test = new TernaryStringSet()
        try {
            test.balance()
            if (test.size != 0) {
                game.splash("Balance test 3b failed.")
                allPassed = false
            }
            test.add("")
            test.balance()
            if (test.size != 1) {
                game.splash("Balance test 3c failed.")
                allPassed = false
            }
        } catch {
            game.splash("Balance test 3a failed.")
            allPassed = false
        }
        
        return allPassed
    }
}