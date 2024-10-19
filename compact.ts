namespace Compact {
    export function run(): boolean {
        let test: TernaryStringSet
        let allPassed: boolean = true

        const compactWords: TernaryStringSet = new TernaryStringSet(ShortEnglishList.words)
        compactWords.compact()

        // Getter matches state.
        test = new TernaryStringSet()
        if (test.compacted) {
            game.splash("Compact test 1a failed.")
            allPassed = false
        }
        test.addAll(["add", "bad", "mad",])
        test.compact()
        if (!test.compacted) {
            game.splash("Compact test 1b failed.")
            allPassed = false
        }

        // Empty set
        test = new TernaryStringSet()
        test.compact()
        if (test.stats.nodes != 0) {
            game.splash("Compact test 2a failed.")
            allPassed = false
        }
        test.add("")
        test.compact()
        if (test.stats.nodes != 0) {
            game.splash("Compact test 2b failed.")
            allPassed = false
        }
        if (!test.has("")) {
            game.splash("Compact test 2c failed.")
            allPassed = false
        }

        // Trivial compaction of tree with no duplicates.
        // For compaction to have an effect,
        // there must be strings with common suffixes.
        test = new TernaryStringSet()
        test.clear()
        test.add("A")
        test.compact()
        if (test.stats.nodes != 1) {
            game.splash("Compact test 3a failed.")
            allPassed = false
        }
        test.add("B")
        test.compact()
        if (test.stats.nodes != 2) {
            game.splash("Compact test 3b failed.")
            allPassed = false
        }
        if (!test.has("A")) {
            game.splash("Compact test 3c failed.")
            allPassed = false
        }
        if (!test.has("B")) {
            game.splash("Compact test 3d failed.")
            allPassed = false
        }

        /**
         * Basic suffix sharing.
         * Here, we add strings with a common suffix, "ing,"
         * but different prefixes. In the original tree,
         * each string will have its own subtree for its "ing,"
         * but in the compacted tree, they will share one subtree.
         */
        test = new TernaryStringSet()
        test.clear()
        test.addAll(["abcing", "defing", "ghiing", "jkling", "mnoing",])
        const preCompactSize: number = test.stats.nodes
        test.compact()
        if (3 * (test.size - 1) != preCompactSize - test.stats.nodes) {
            game.splash("Compact test 4 failed.")
            allPassed = false
        }

        /**
         * Non-trivial suffix sharing.
         * A more complex example than the basic test.
         * In this case, each string has a unique prefix, "a" -- "d."
         * All have a common suffix, "ing,"
         * but two share the suffix "_aing"
         * and two share the suffix "_bing."
         * Before compactio0n, there is a node for each letter
         * of each string (6 chars * 4 strings) since there are
         * no shared prefixes. After compaction, we expect a node each
         * for the prefixes, three nodes for the shared "ing,"
         * two nodes for the shared "_a," and two for the "_b"
         * (4 + 3 + 2 + 2)
         */
        test = new TernaryStringSet()
        const words: string[] = ["a_aing", "b_aing", "c_bing", "d_bing",]
        test.addAll(words)
        if (test.stats.nodes != 24) {
            game.splash("Compact test 5a failed.")
            allPassed = false
        }
        test.compact()
        if (test.stats.nodes != 11) {
            game.splash("Compact test 5b failed.")
            allPassed = false
        }

        /**
         * If we add "e_ai," this will add 4 nodes since the prefix "e"
         * is unique and "ai" was previously infix, not a suffix!
         */
        test.add("e_ai")
        test.compact()
        if (test.stats.nodes != 15) {
            game.splash("Compact test 5c failed.")
            allPassed = false
        }

        /**
         * Whereas if we add "fng," only one more node is needed
         * (for the "f"), since the suffix "ng" is part of the
         * existing "ing" subtree.
         */
        test.add("fng")
        test.compact()
        if (test.stats.nodes != 16) {
            game.splash("Compact test 5d failed.")
            allPassed = false
        }

        // Dictionary compaction.
        test = compactWords
        if (test.size != ShortEnglishList.words.length) {
            game.splash("Compact test 6a failed.")
            allPassed = false
        }
        /**
         * Non-trivial compacted set should have fewer nodes.
         * In fact, for our word list, it is leff than half as many nodes!
         */
        let wordSet: TernaryStringSet = new TernaryStringSet(ShortEnglishList.words)
        // game.splash(`Loose nodes: ${wordSet.stats.nodes}, compact nodes: ${test.stats.nodes}`)
        if (test.stats.nodes >= wordSet.stats.nodes) {
            game.splash("Compact test 6b failed.")
            allPassed = false
        }
        // But it should contain all of the same words.
        for (let s of ShortEnglishList.words) {
            if (!test.has(s)) {
                game.splash(`Compact test 6c failed word ${s}.`)
                allPassed = false
            }
        }

        /**
         * Automatic decompaction on mutation.
         * Attempting to mutate a compact set must leave it uncompacted.
         */
        const compactOriginal: TernaryStringSet = new TernaryStringSet()
        compactOriginal.addAll([
            "alligator",
            "bass",
            "crane",
            "dove",
            "eagle",
            "flea",
            "porcupine",
        ])
        compactOriginal.compact()
        if (!compactOriginal.compacted) {
            game.splash("Compact test 7a failed.")
            allPassed = false
        }

        // Copying a compact set yields a compact copy.
        test = new TernaryStringSet(compactOriginal)
        if (!test.compacted) {
            game.splash("Compact test 7b failed.")
            allPassed = false
        }

        // Adding a string already in the set has no effect.
        test.add("alligator")
        if (!test.compacted) {
            game.splash("Compact test 7c failed.")
            allPassed = false
        }

        // Adding a string not in the set undoes compaction.
        test.add("dragonfly")
        if (test.compacted) {
            game.splash("Compact test 7d failed.")
            allPassed = false
        }

        // As does adding via addAll().
        test = new TernaryStringSet(compactOriginal)
        test.addAll(["dragonfly",])
        if (test.compacted) {
            game.splash("Compact test 7e failed.")
            allPassed = false
        }

        /**
         * Likewise, deleting a string not in the set has no effect,
         * while actually deleting a string undoes compaction.
         */
        test = new TernaryStringSet(compactOriginal)
        test.delete("zedonk")
        if (!test.compacted) {
            game.splash("Compact test 7f failed.")
            allPassed = false
        }
        test.delete("alligator")
        if (test.compacted) {
            game.splash("Compact test 7g failed.")
            allPassed = false
        }

        // balance() undoes compaction.
        test = new TernaryStringSet(compactOriginal)
        test.balance()
        if (test.compacted) {
            game.splash("Compact test 7h failed.")
            allPassed = false
        }

        // clear() trivially resets the compaction state.
        test = new TernaryStringSet(compactOriginal)
        test.clear()
        if (test.compacted) {
            game.splash("Compact test 7i failed.")
            allPassed = false
        }

        // Non-mutating methods do not decompact.
        const rhs: TernaryStringSet = new TernaryStringSet(["list", "wrestle",])
        test = compactWords
        // test.equals(rhs)
        test.forEach((s) => s)
        test.getArrangementsOf("coat")
        test.getCompletionsOf("win")
        test.getPartialMatchesOf("cu.")
        test.getWithinHammingDistanceOf("cat", 1)
        test.has("cat")
        // test.isSubsetOf(rhs)
        // test.isSupersetOf(rhs)
        // test.keys
        test.size
        // test.values
        if (!test.compacted) {
            game.splash("Compact test 8 failed.")
            allPassed = false
        }

        return allPassed
    }
}