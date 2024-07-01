namespace StatsTests {
    export function run(): boolean {
        let test: TernaryStringSet
        let stats: TernaryTreeStats
        let allPassed: boolean = true

        // Trivial stats for empty set.
        test = new TernaryStringSet()
        stats = test.stats
        if (stats.size != 0) {
            game.splash("Stats test 1a failed.")
            allPassed = false
        }
        if (stats.nodes != 0) {
            game.splash("Stats test 1b failed.")
            allPassed = false
        }
        if (stats.depth != 0) {
            game.splash("Stats test 1c failed.")
            allPassed = false
        }
        if (stats.breadth.length != 0) {
            game.splash("Stats test 1d failed.")
            allPassed = false
        }
        if (stats.minCodePoint != 0) {
            game.splash("Stats test 1e failed.")
            allPassed = false
        }
        if (stats.maxCodePoint != 0) {
            game.splash("Stats test 1f failed.")
            allPassed = false
        }
        if (stats.surrogates != 0) {
            game.splash("Stats test 1g failed.")
            allPassed = false
        }

        // Empty string increments size but adds no nodes.
        test.add("")
        stats = test.stats
        if (stats.size != 1) {
            game.splash("Stats test 2a failed.")
            allPassed = false
        }
        if (stats.nodes != 0) {
            game.splash("Stats test 2b failed.")
            allPassed = false
        }
        if (stats.depth != 0) {
            game.splash("Stats test 2c failed.")
            allPassed = false
        }
        if (stats.breadth.length != 0) {
            game.splash("Stats test 2d failed.")
            allPassed = false
        }
        if (stats.minCodePoint != 0) {
            game.splash("Stats test 2e failed.")
            allPassed = false
        }
        if (stats.maxCodePoint != 0) {
            game.splash("Stats test 2f failed.")
            allPassed = false
        }
        if (stats.surrogates != 0) {
            game.splash("Stats test 2g failed.")
            allPassed = false
        }

        // Stats for singleton length 1 string.
        test = new TernaryStringSet()
        test.add("B")
        stats = test.stats
        if (stats.size != 1) {
            game.splash("Stats test 3a failed.")
            allPassed = false
        }
        if (stats.nodes != 1) {
            game.splash("Stats test 3b failed.")
            allPassed = false
        }
        if (stats.depth != 1) {
            game.splash("Stats test 3c failed.")
            allPassed = false
        }
        if (stats.breadth.length != 1) {
            game.splash("Stats test 3d failed.")
            allPassed = false
        }
        if (stats.minCodePoint != 66) {
            game.splash("Stats test 3e failed.")
            allPassed = false
        }
        if (stats.maxCodePoint != 66) {
            game.splash("Stats test 3f failed.")
            allPassed = false
        }
        if (stats.surrogates != 0) {
            game.splash("Stats test 3g failed.")
            allPassed = false
        }

        // Stats for tree with single left child.
        test = new TernaryStringSet()
        test.add("B")
        test.add("A")
        stats = test.stats
        if (stats.size != 2) {
            game.splash("Stats test 4a failed.")
            allPassed = false
        }
        if (stats.nodes != 2) {
            game.splash("Stats test 4b failed.")
            allPassed = false
        }
        if (stats.depth != 2) {
            game.splash("Stats test 4c failed.")
            allPassed = false
        }
        if (stats.breadth.length != 2) {
            game.splash("Stats test 4d failed.")
            allPassed = false
        }
        if (stats.minCodePoint != 65) {
            game.splash("Stats test 4e failed.")
            allPassed = false
        }
        if (stats.maxCodePoint != 66) {
            game.splash("Stats test 4f failed.")
            allPassed = false
        }
        if (stats.surrogates != 0) {
            game.splash("Stats test 4g failed.")
            allPassed = false
        }

        // Stats for tree with both children.
        test = new TernaryStringSet()
        test.add("B")
        test.add("A")
        test.add("C")
        stats = test.stats
        if (stats.size != 3) {
            game.splash("Stats test 5a failed.")
            allPassed = false
        }
        if (stats.nodes != 3) {
            game.splash("Stats test 5b failed.")
            allPassed = false
        }
        if (stats.depth != 2) {
            game.splash("Stats test 5c failed.")
            allPassed = false
        }
        if (stats.breadth.length != 2) {
            game.splash("Stats test 5d failed.")
            allPassed = false
        }
        if (stats.minCodePoint != 65) {
            game.splash("Stats test 5e failed.")
            allPassed = false
        }
        if (stats.maxCodePoint != 67) {
            game.splash("Stats test 5f failed.")
            allPassed = false
        }
        if (stats.surrogates != 0) {
            game.splash("Stats test 5g failed.")
            allPassed = false
        }

        // Stats for three-level tree.
        test = new TernaryStringSet()
        test.add("B")
        test.add("A")
        test.add("C")
        test.add("D")
        stats = test.stats
        if (stats.size != 4) {
            game.splash("Stats test 6a failed.")
            allPassed = false
        }
        if (stats.nodes != 4) {
            game.splash("Stats test 6b failed.")
            allPassed = false
        }
        if (stats.depth != 3) {
            game.splash("Stats test 6c failed.")
            allPassed = false
        }
        if (stats.breadth.length != 3) {
            game.splash("Stats test 6d failed.")
            allPassed = false
        }
        if (stats.minCodePoint != 65) {
            game.splash("Stats test 6e failed.")
            allPassed = false
        }
        if (stats.maxCodePoint != 68) {
            game.splash("Stats test 6f failed.")
            allPassed = false
        }
        if (stats.surrogates != 0) {
            game.splash("Stats test 6g failed.")
            allPassed = false
        }

        return allPassed
    }
}