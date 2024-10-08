namespace Approx {
    export function run(): boolean {
        let allPassed: boolean = true
        if (!arrangements()) {
            allPassed = false
        }
        if (!completions()) {
            allPassed = false
        }
        if (!completedBy()) {
            allPassed = false
        }
        if (!partials()) {
            allPassed = false
        }
        if (!hamming()) {
            allPassed = false
        }
        if (!edit()) {
            allPassed = false
        }
        return allPassed
    }

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
    
    function arrangements(): boolean {
        let test: TernaryStringSet
        let allPassed: boolean = true
        
        test = new TernaryStringSet()
        test.addAll([
            "apple",
            "baboon",
            "ice",
            "iced",
            "icicle",
            "ire",
            "mice",
            "nice",
            "niece",
            "rein",
            "rice",
            "spice",
        ])
        if (!areEquivalent([
            "ice",
            "ire",
            "nice",
            "rein",
            "rice",
        ], test.getArrangementsOf("nicer"))) {
            game.splash("Arrangements test 1 failed.")
            allPassed = false
        }

        test = new TernaryStringSet()
        test.addAll([
            "aah",
            "aardvark",
            "bar",
            "bazaar",
            "dark",
            "a",
            "aa",
            "aaa",
            "baa",
        ])
        if (!areEquivalent(["a", "aa", "dark",], test.getArrangementsOf("ardvark"))) {
            game.splash("Arrangements test 2a failed.")
            allPassed = false
        }
        if (!areEquivalent([
            "a",
            "aa",
            "aaa",
            "aardvark",
            "dark",
        ], test.getArrangementsOf("aardvark"))) {
            game.splash("Arrangements test 2b failed.")
            allPassed = false
        }
        if (test.getArrangementsOf("").length != 0) {
            game.splash("Arrangements test 2c failed.")
            allPassed = false
        }
        if (!areEquivalent(["a",], test.getArrangementsOf("a"))) {
            game.splash("Arrangements test 2d failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "aa",], test.getArrangementsOf("aa"))) {
            game.splash("Arrangements test 2e failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "aa", "aaa",], test.getArrangementsOf("aaa"))) {
            game.splash("Arrangements test 2f failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "aa", "aaa",], test.getArrangementsOf("aaaa"))) {
            game.splash("Arrangements test 2g failed.")
            allPassed = false
        }

        test = new TernaryStringSet()
        test.addAll(["a", "b", "c",])
        if (!areEquivalent([], test.getArrangementsOf(""))) {
            game.splash("Arrangements test 3a failed.")
            allPassed = false
        }
        test.add("")
        if (!areEquivalent(["",], test.getArrangementsOf(""))) {
            game.splash("Arrangements test 3b failed.")
            allPassed = false
        }
        if (!areEquivalent(["",], test.getArrangementsOf("z"))) {
            game.splash("Arrangements test 3c failed.")
            allPassed = false
        }
        if (!areEquivalent(["", "a",], test.getArrangementsOf("a"))) {
            game.splash("Arrangements test 3d failed.")
            allPassed = false
        }

        return allPassed
    }

    function completedBy(): boolean {
        let test: TernaryStringSet
        let allPassed: boolean = true

        const elements: string[] = [
            "",
            "aardvark",
            "bumping",
            "jumping",
            "lamb",
            "lifting",
            "muskrat",
            "trying",
            "turtles",
        ]

        test = new TernaryStringSet(elements)
        if (!areEquivalent(elements, test.getCompletedBy(""))) {
            game.splash("Completed-by test 1a failed.")
            allPassed = false
        }
        if (!areEquivalent([
            "bumping",
            "jumping",
            "lifting",
            "trying",
        ], test.getCompletedBy("ing"))) {
            game.splash("Completed-by test 1b failed.")
            allPassed = false
        }

        test = new TernaryStringSet(ShortEnglishList.words)
        if (!areEquivalent(_completedBy("s", ShortEnglishList.words),
            test.getCompletedBy("s"))) {
                game.splash("Completed-by test 2a failed.")
                allPassed = false
        }
        if (!areEquivalent(_completedBy("ing", ShortEnglishList.words),
            test.getCompletedBy("ing"))) {
                game.splash("Completed-by test 2b failed.")
                allPassed = false
        }
        if (test.getCompletedBy("zzz").length != 0) {
            game.splash("Completed-by test 2c failed.")
            allPassed = false
        }

        return allPassed
    }

    function completions(): boolean {
        let test: TernaryStringSet
        let allPassed: boolean = true
        const elements: string[] = [
            "",
            "aardvark",
            "aardvarks",
            "armadillo",
            "baboon",
            "badger",
            "cats",
        ]
        test = new TernaryStringSet()
        test.addAll(elements)
        if (!areEquivalent(elements, test.getCompletionsOf(""))) {
            game.splash("Completions test 1a failed.")
            allPassed = false
        }
        if (!areEquivalent([
            "aardvark",
            "aardvarks",
            "armadillo",
        ], test.getCompletionsOf("a"))) {
            game.splash("Completions test 1b failed.")
            allPassed = false
        }
        if (!areEquivalent(["aardvark", "aardvarks",], test.getCompletionsOf("aa"))) {
            game.splash("Completions test 1c failed.")
            allPassed = false
        }
        if (!areEquivalent(["aardvark", "aardvarks",], test.getCompletionsOf("aardvark"))) {
            game.splash("Completions test 1d failed.")
            allPassed = false
        }
        if (!areEquivalent(["aardvarks",], test.getCompletionsOf("aardvarks"))) {
            game.splash("Completions test 1e failed.")
            allPassed = false
        }
        if (!areEquivalent([], test.getCompletionsOf("aardvarkz"))) {
            game.splash("Completions test 1f failed.")
            allPassed = false
        }
        if (!areEquivalent([], test.getCompletionsOf("aardvarksz"))) {
            game.splash("Completions test 1g failed.")
            allPassed = false
        }
        if (!areEquivalent(["baboon", "badger",], test.getCompletionsOf("b"))) {
            game.splash("Completions test 1h failed.")
            allPassed = false
        }
        if (!areEquivalent(["baboon", "badger",], test.getCompletionsOf("ba"))) {
            game.splash("Completions test 1i failed.")
            allPassed = false
        }
        if (!areEquivalent(["baboon",], test.getCompletionsOf("bab"))) {
            game.splash("Completions test 1j failed.")
            allPassed = false
        }
        if (!areEquivalent(["baboon",], test.getCompletionsOf("baboon"))) {
            game.splash("Completions test 1k failed.")
            allPassed = false
        }
        if (!areEquivalent([], test.getCompletionsOf("z"))) {
            game.splash("Completions test 1l failed.")
            allPassed = false
        }
        if (!areEquivalent([], test.getCompletionsOf("zaa"))) {
            game.splash("Completions test 1m failed.")
            allPassed = false
        }
        if (!areEquivalent([], test.getCompletionsOf("babz"))) {
            game.splash("Completions test 1n failed.")
            allPassed = false
        }

        test = new TernaryStringSet(ShortEnglishList.words)
        if (!areEquivalent(_completions("z", ShortEnglishList.words),
            test.getCompletionsOf("z"))) {
                game.splash("Completions test 2a failed.")
                allPassed = false
            }
        if (!areEquivalent(_completions("wi", ShortEnglishList.words),
            test.getCompletionsOf("wi"))) {
            game.splash("Completions test 2b failed.")
            allPassed = false
        }
        if (test.getCompletionsOf("wi").length != 14) {
            game.splash("Completions test 2c failed.")
            allPassed = false
        }
        if (!areEquivalent([
            "she",
            "sheep",
            "sheet",
            "shelf",
        ], test.getCompletionsOf("she"))) {
            game.splash("Completions test 2d failed.")
            allPassed = false
        }

        return allPassed
    }

    function edit(): boolean {
        let test: TernaryStringSet
        let allPassed: boolean = true

        // getWithinEditDistanceOf() bad arguments throw.
        test = new TernaryStringSet()
        try {
            test.getWithinEditDistanceOf(null, 0)
            game.splash("Edit test 1a failed.")
            allPassed = false
        } catch {
        }
        try {
            test.getWithinEditDistanceOf("", -1)
            game.splash("Edit test 1b failed.")
            allPassed = false
        } catch {
        }
        try {
            test.getWithinEditDistanceOf("", NaN)
            game.splash("Edit test 1c failed.")
            allPassed = false
        } catch {
        }

        // getWithinEditDistanceOf() empty tree has no results.
        test = new TernaryStringSet()
        if (test.getWithinEditDistanceOf('', 10).length != 0) {
            game.splash("Edit test 2a failed.")
            allPassed = false
        }
        if (test.getWithinEditDistanceOf("a", 10).length != 0) {
            game.splash("Edit test 2b failed.")
            allPassed = false
        }

        // getWithinEditDistanceOf() can delete to empty string
        // if present.
        test = new TernaryStringSet()
        test.add("")
        let s: string = ""
        if (!areEquivalent(["",], test.getWithinEditDistanceOf(s, 0))) {
            game.splash("Edit test 3a failed.")
            allPassed = false
        }
        if (!areEquivalent(["",], test.getWithinEditDistanceOf(s, 1))) {
            game.splash("Edit test 3b failed.")
            allPassed = false
        }
        if (!areEquivalent(["",], test.getWithinEditDistanceOf(s, 2))) {
            game.splash("Edit test 3c failed.")
            allPassed = false
        }

        s = "a"
        if (test.getWithinEditDistanceOf(s, 0).length != 0) {
            game.splash("Edit test 3d failed.")
            allPassed = false
        }
        if (!areEquivalent(["",], test.getWithinEditDistanceOf(s, 1))) {
            game.splash("Edit test 3e failed.")
            allPassed = false
        }
        if (!areEquivalent(["",], test.getWithinEditDistanceOf(s, 2))) {
            game.splash("Edit test 3f failed.")
            allPassed = false
        }

        s = "ab"
        if (test.getWithinEditDistanceOf(s, 0).length != 0) {
            game.splash("Edit test 3g failed.")
            allPassed = false
        }
        if (test.getWithinEditDistanceOf(s, 1).length != 0) {
            game.splash("Edit test 3h failed.")
            allPassed = false
        }
        if (!areEquivalent(["",], test.getWithinEditDistanceOf(s, 2))) {
            game.splash("Edit test 3i failed.")
            allPassed = false
        }
        if (!areEquivalent(["",], test.getWithinEditDistanceOf(s, 3))) {
            game.splash("Edit test 3j failed.")
            allPassed = false
        }

        test.delete("")
        s = ""
        if (test.getWithinEditDistanceOf(s, 0).length != 0) {
            game.splash("Edit test 3k failed.")
            allPassed = false
        }
        if (test.getWithinEditDistanceOf(s, 1).length != 0) {
            game.splash("Edit test 3l failed.")
            allPassed = false
        }
        if (test.getWithinEditDistanceOf(s, 2).length != 0) {
            game.splash("Edit test 3m failed.")
            allPassed = false
        }

        s = "a"
        if (test.getWithinEditDistanceOf(s, 0).length != 0) {
            game.splash("Edit test 3n failed.")
            allPassed = false
        }
        if (test.getWithinEditDistanceOf(s, 1).length != 0) {
            game.splash("Edit test 3o failed.")
            allPassed = false
        }
        if (test.getWithinEditDistanceOf(s, 2).length != 0) {
            game.splash("Edit test 3p failed.")
            allPassed = false
        }

        s = "ab"
        if (test.getWithinEditDistanceOf(s, 0).length != 0) {
            game.splash("Edit test 3q failed.")
            allPassed = false
        }
        if (test.getWithinEditDistanceOf(s, 1).length != 0) {
            game.splash("Edit test 3r failed.")
            allPassed = false
        }
        if (test.getWithinEditDistanceOf(s, 2).length != 0) {
            game.splash("Edit test 3s failed.")
            allPassed = false
        }
        if (test.getWithinEditDistanceOf(s, 3).length != 0) {
            game.splash("Edit test 3t failed.")
            allPassed = false
        }

        // getWithinEditDistanceOf() insert after end of pattern.
        test = new TernaryStringSet()
        test.addAll(["a", "ab", "abc", "b",])
        if (test.getWithinEditDistanceOf("", 0).length != 0) {
            game.splash("Edit test 4a failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "b",], test.getWithinEditDistanceOf("", 1))) {
            game.splash("Edit test 4b failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "ab", "b",], test.getWithinEditDistanceOf("", 2))) {
            game.splash("Edit test 4c failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "ab", "abc", "b",], test.getWithinEditDistanceOf("", 3))) {
            game.splash("Edit test 4d failed.")
            allPassed = false
        }
        if (!areEquivalent(["a",], test.getWithinEditDistanceOf("a", 0))) {
            game.splash("Edit test 4e failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "ab", "b",], test.getWithinEditDistanceOf("a", 1))) {
            game.splash("Edit test 4f failed.")
            allPassed = false
        }

        test.clear()
        test.addAll(["ab", "abc", "abcd",])
        if (test.getWithinEditDistanceOf("a", 0).length != 0) {
            game.splash("Edit test 4g failed.")
            allPassed = false
        }
        if (!areEquivalent(["ab",], test.getWithinEditDistanceOf("a", 1))) {
            game.splash("Edit test 4h failed.")
            allPassed = false
        }
        if (!areEquivalent(["ab", "abc",], test.getWithinEditDistanceOf("a", 2))) {
            game.splash("Edit test 4i failed.")
            allPassed = false
        }
        if (!areEquivalent(["ab", "abc", "abcd",], test.getWithinEditDistanceOf("a", 3))) {
            game.splash("Edit test 4j failed.")
            allPassed = false
        }

        // getWithinEditDistanceOf() insert before end of pattern.
        test = new TernaryStringSet()
        test.addAll(["a", "ab", "abc", "b",])
        if (!areEquivalent(["b",], test.getWithinEditDistanceOf("b", 0))) {
            game.splash("Edit test 5a failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "ab", "b",], test.getWithinEditDistanceOf("b", 1))) {
            game.splash("Edit test 5b failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "ab", "abc", "b",], test.getWithinEditDistanceOf("b", 2))) {
            game.splash("Edit test 5c failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "ab", "abc",], test.getWithinEditDistanceOf("ac", 1))) {
            game.splash("Edit test 5d failed.")
            allPassed = false
        }

        // getWithinEditDistanceOf() single substitution.
        test = new TernaryStringSet()
        test.addAll(["a", "b", "c", "d",])
        if (test.getWithinEditDistanceOf("z", 0).length != 0) {
            game.splash("Edit test 6a failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "b", "c", "d",], test.getWithinEditDistanceOf("z", 1))) {
            game.splash("Edit test 6b failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "b", "c", "d",], test.getWithinEditDistanceOf("z", 2))) {
            game.splash("Edit test 6c failed.")
            allPassed = false
        }
        if (!areEquivalent(["a",], test.getWithinEditDistanceOf("a", 0))) {
            game.splash("Edit test 6d failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "b", "c", "d",], test.getWithinEditDistanceOf("a", 1))) {
            game.splash("Edit test 6e failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "b", "c", "d",], test.getWithinEditDistanceOf("a", 2))) {
            game.splash("Edit test 6f failed.")
            allPassed = false
        }

        // getWithinEditDistanceOf() multiple substitutions.
        const words: string[] = [
            "bat",
            "bit",
            "bye",
            "cap",
            "cat",
            "cog",
            "cot",
            "mat",
            "oat",
            "zip",
        ]
        test = new TernaryStringSet()
        test.addAll(words)
        if (!areEquivalent(["cat",], test.getWithinEditDistanceOf("cat", 0))) {
            game.splash("Edit test 7a failed.")
            allPassed = false
        }
        if (!areEquivalent([
            "bat",
            "cap",
            "cat",
            "cot",
            "mat",
            "oat",
        ], test.getWithinEditDistanceOf("cat", 1))) {
            game.splash("Edit test 7b failed.")
            allPassed = false
        }
        if (!areEquivalent([
            "bat",
            "bit",
            "cap",
            "cat",
            "cog",
            "cot",
            "mat",
            "oat",
        ], test.getWithinEditDistanceOf("cat", 2))) {
            game.splash("Edit test 7c failed.")
            allPassed = false
        }
        if (!areEquivalent(words, test.getWithinEditDistanceOf("cat", 3))) {
            game.splash("Edit test 7d failed.")
            allPassed = false
        }
        if (!areEquivalent(words, test.getWithinEditDistanceOf("cat", 4))) {
            game.splash("Edit test 7e failed.")
            allPassed = false
        }

        // getWithinEditDistanceOf() delete from start of pattern.
        test = new TernaryStringSet()
        test.addAll(["abc", "def", "ghi",])
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("aabc", 1))) {
            game.splash("Edit test 8a failed.")
            allPassed = false
        }
        if (!areEquivalent(["def",], test.getWithinEditDistanceOf("adef", 1))) {
            game.splash("Edit test 8b failed.")
            allPassed = false
        }
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("aaabc", 2))) {
            game.splash("Edit test 8c failed.")
            allPassed = false
        }
        if (!areEquivalent(["def",], test.getWithinEditDistanceOf("aadef", 2))) {
            game.splash("Edit test 8d failed.")
            allPassed = false
        }
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("xaabc", 2))) {
            game.splash("Edit test 8e failed.")
            allPassed = false
        }
        if (!areEquivalent(["def",], test.getWithinEditDistanceOf("xadef", 2))) {
            game.splash("Edit test 8f failed.")
            allPassed = false
        }
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("azabc", 2))) {
            game.splash("Edit test 8g failed.")
            allPassed = false
        }
        if (!areEquivalent(["def",], test.getWithinEditDistanceOf("azdef", 2))) {
            game.splash("Edit test 8h failed.")
            allPassed = false
        }

        // getWithinEditDistanceOf() delete from middle of pattern.
        test = new TernaryStringSet()
        test.addAll(["abc", "def", "ghi",])
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("axbc", 1))) {
            game.splash("Edit test 9a failed.")
            allPassed = false
        }
        if (!areEquivalent(["def",], test.getWithinEditDistanceOf("deef", 1))) {
            game.splash("Edit test 9b failed.")
            allPassed = false
        }
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("axbc", 1))) {
            game.splash("Edit test 9c failed.")
            allPassed = false
        }
        if (!areEquivalent(["def",], test.getWithinEditDistanceOf("deeef", 2))) {
            game.splash("Edit test 9d failed.")
            allPassed = false
        }
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("axxbc", 2))) {
            game.splash("Edit test 9e failed.")
            allPassed = false
        }
        if (!areEquivalent(["def",], test.getWithinEditDistanceOf("dxeef", 2))) {
            game.splash("Edit test 9f failed.")
            allPassed = false
        }
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("abxbc", 2))) {
            game.splash("Edit test 9g failed.")
            allPassed = false
        }
        if (!areEquivalent(["def",], test.getWithinEditDistanceOf("dexef", 2))) {
            game.splash("Edit test 9h failed.")
            allPassed = false
        }
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("abxbc", 2))) {
            game.splash("Edit test 9i failed.")
            allPassed = false
        }

        // getWithinEditDistanceOf() delete from end of pattern.
        test = new TernaryStringSet()
        test.addAll(["abc", "def", "ghi",])
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("abca", 1))) {
            game.splash("Edit test 10a failed.")
            allPassed = false
        }
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("abcc", 1))) {
            game.splash("Edit test 10b failed.")
            allPassed = false
        }
        if (!areEquivalent(["def",], test.getWithinEditDistanceOf("defe", 1))) {
            game.splash("Edit test 10c failed.")
            allPassed = false
        }
        if (!areEquivalent(["def",], test.getWithinEditDistanceOf("deff", 1))) {
            game.splash("Edit test 10d failed.")
            allPassed = false
        }
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("abcab", 2))) {
            game.splash("Edit test 10e failed.")
            allPassed = false
        }
        if (!areEquivalent(["abc",], test.getWithinEditDistanceOf("abcbc", 2))) {
            game.splash("Edit test 10f failed.")
            allPassed = false
        }
        if (!areEquivalent(["def",], test.getWithinEditDistanceOf("defde", 2))) {
            game.splash("Edit test 10g failed.")
            allPassed = false
        }
        if (!areEquivalent(["def",], test.getWithinEditDistanceOf("defef", 2))) {
            game.splash("Edit test 10h failed.")
            allPassed = false
        }
        if (!areEquivalent(["abc", "def",], test.getWithinEditDistanceOf("abcdef", 3))) {
            game.splash("Edit test 10i failed.")
            allPassed = false
        }

        /*
        // These take a while, so commented out for brevity.
        wordListTest("aardva", 3)
        wordListTest("ae", 4)
        wordListTest("e", 24)
        wordListTest("eeeeeeeeeeee", 24)
        wordListTest("ea", 2)
        wordListTest("ing", 5)
        wordListTest("orl", 1)
        wordListTest("orl", 2)
        wordListTest("pie", 2)
        wordListTest("restaurant", 0)
        wordListTest("estaurant", 1)
        wordListTest("resturant", 1)
        wordListTest("restauran", 1)
        wordListTest("xrestaurant", 1)
        wordListTest("restxaurant", 1)
        wordListTest("resttaurant", 1)
        wordListTest("restaurantx", 1)
        // This one takes a *really* long time.
        wordListTest("restxaurant", 11)
        wordListTest("rn", 3)
        wordListTest("wi", 2)
        wordListTest("world", 1)
        wordListTest("zzz", 2)
        wordListTest("", 1)
        wordListTest("", 2)
        wordListTest("", 3)
        wordListTest("", 24)
        */
        return allPassed
    }

    function hamming(): boolean {
        let test: TernaryStringSet
        let allPassed: boolean = true
        
        // getWithinHammingDistanceOf() bad arguments throw.
        test = new TernaryStringSet()
        try {
            test.getWithinHammingDistanceOf(null, 0)
            game.splash("Hamming test 1a failed.")
            allPassed = false
        } catch {
        }
        try {
            test.getWithinHammingDistanceOf("", -1)
            game.splash("Hamming test 1b failed.")
            allPassed = false
        } catch {
        }
        try {
            test.getWithinHammingDistanceOf("", NaN)
            game.splash("Hamming test 1c failed.")
            allPassed = false
        } catch {
        }

        // getWithinHammingDistanceOf() distance 0 is exact match.
        test = new TernaryStringSet()
        test.addAll(["a", "aa", "aaa", "aaaa", "aac", "abc", "xyz",])
        if (!areEquivalent(["abc",], test.getWithinHammingDistanceOf("abc", 0))) {
            game.splash("Hamming test 2a failed.")
            allPassed = false
        }
        if (test.getWithinHammingDistanceOf("abz", 0).length != 0) {
            game.splash("Hamming test 2b failed.")
            allPassed = false
        }
        if (test.getWithinHammingDistanceOf("azz", 0).length != 0) {
            game.splash("Hamming test 2c failed.")
            allPassed = false
        }
        if (test.getWithinHammingDistanceOf("zzz", 0).length != 0) {
            game.splash("Hamming test 2d failed.")
            allPassed = false
        }

        // getWithinHammingDistanceOf() distance >= n
        // matches all strings with pattern's length.
        test = new TernaryStringSet()
        test.addAll(["a", "aa", "aaa", "aaaa", "aac", "abc", "xyz",])
        if (!areEquivalent(["aaa", "aac", "abc", "xyz",], test.getWithinHammingDistanceOf("abc", 3))) {
            game.splash("Hamming test 3a failed.")
            allPassed = false
        }
        if (!areEquivalent(["aaa", "aac", "abc", "xyz",], test.getWithinHammingDistanceOf("abc", 4))) {
            game.splash("Hamming test 3b failed.")
            allPassed = false
        }
        if (!areEquivalent(["aaa", "aac", "abc", "xyz",], test.getWithinHammingDistanceOf("abc", Infinity))) {
            game.splash("Hamming test 3c failed.")
            allPassed = false
        }

        // getWithinHammingDistanceOf() distance 1..n-1
        // matches strings <= dist
        test = new TernaryStringSet()
        test.addAll(["a", "aa", "aaa", "aaaa", "aac", "abc", "xyz",])
        if (!areEquivalent(["aac", "abc",], test.getWithinHammingDistanceOf("abc", 1))) {
            game.splash("Hamming test 4a failed.")
            allPassed = false
        }
        if (!areEquivalent(["aaa", "aac", "abc",], test.getWithinHammingDistanceOf("abc", 2))) {
            game.splash("Hamming test 4b failed.")
            allPassed = false
        }

        // getWithinHammingDistanceOf() for cats (abbreviated)
        test = new TernaryStringSet(ShortEnglishList.words)
        if (!areEquivalent(["cat",], test.getWithinHammingDistanceOf("cat", 0))) {
            game.splash("Hamming test 5a failed.")
            allPassed = false
        }
        if (!areEquivalent(ShortEnglishList.words.filter((s) => s.length == 3),
        test.getWithinHammingDistanceOf("cat", 3))) {
            game.splash("Hamming test 5d failed.")
            allPassed = false
        }

        // getWithinHammingDistanceOf() empty string handling.
        test = new TernaryStringSet(["", "a", "b",])
        if (!areEquivalent([""], test.getWithinHammingDistanceOf("", 0))) {
            game.splash("Hamming test 6a failed.")
            allPassed = false
        }
        if (!areEquivalent([""], test.getWithinHammingDistanceOf("", 1))) {
            game.splash("Hamming test 6b failed.")
            allPassed = false
        }
        test.delete("")
        if (test.getWithinHammingDistanceOf("", 0).length != 0) {
            game.splash("Hamming test 6c failed.")
            allPassed = false
        }
        return allPassed
    }

    function partials(): boolean {
        let test: TernaryStringSet
        let allPassed: boolean = true
        const elements: string[] = ["a", "aa", "aaa", "aab", "aaaa", "aaaaa", "aaaab", "aaaac"];

        // getPartialMatchesOf() bad arguments throw.
        test = new TernaryStringSet()
        try {
            test.getPartialMatchesOf(null)
            game.splash("Partials test 1 failed.")
            allPassed = false
        } catch {
        }

        // getPartialMatchesOf() basic partial matches.
        test = new TernaryStringSet()
        test.addAll(elements)
        if (!areEquivalent(["a",], test.getPartialMatchesOf("?", "?"))) {
            game.splash("Partials test 2a failed.")
            allPassed = false
        }
        if (test.getPartialMatchesOf("").length != 0) {
            game.splash("Partials test 2b failed.")
            allPassed = false
        }
        if (!areEquivalent(["aa",], test.getPartialMatchesOf("a."))) {
            game.splash("Partials test 2c failed.")
            allPassed = false
        }
        if (!areEquivalent(["aaa", "aab",], test.getPartialMatchesOf("a.."))) {
            game.splash("Partials test 2d failed.")
            allPassed = false
        }
        if (!areEquivalent(["aaa", "aab",], test.getPartialMatchesOf("aa."))) {
            game.splash("Partials test 2e failed.")
            allPassed = false
        }
        if (!areEquivalent(["aaa", "aab",], test.getPartialMatchesOf("..."))) {
            game.splash("Partials test 2f failed.")
            allPassed = false
        }
        if (!areEquivalent(["aaa",], test.getPartialMatchesOf(".aa"))) {
            game.splash("Partials test 2g failed.")
            allPassed = false
        }
        if (!areEquivalent(["aab",], test.getPartialMatchesOf(".ab"))) {
            game.splash("Partials test 2h failed.")
            allPassed = false
        }
        if (!areEquivalent(["aaa",], test.getPartialMatchesOf("..a"))) {
            game.splash("Partials test 2i failed.")
            allPassed = false
        }
        if (!areEquivalent(["aab",], test.getPartialMatchesOf("..b"))) {
            game.splash("Partials test 2j failed.")
            allPassed = false
        }
        if (!areEquivalent(["aaa", "aab",], test.getPartialMatchesOf(".a."))) {
            game.splash("Partials test 2k failed.")
            allPassed = false
        }
        if (!areEquivalent(["aaaaa", "aaaab", "aaaac",], test.getPartialMatchesOf("....."))) {
            game.splash("Partials test 2l failed.")
            allPassed = false
        }
        if (!areEquivalent(["aaaaa", "aaaab", "aaaac",], test.getPartialMatchesOf("aaaa."))) {
            game.splash("Partials test 2m failed.")
            allPassed = false
        }
        // Strings with no "don't care" can only match their exact string.
        let pass: number = 0
        for (let el of elements) {
            if (!areEquivalent([el,], test.getPartialMatchesOf(el))) {
                game.splash("Partials test 2n pass " + pass + " failed.")
                allPassed = false
            }
            pass++
        }
        if (test.getPartialMatchesOf("Z").length != 0) {
            game.splash("Partials test 2o failed.")
            allPassed = false
        }

        // getPartialMatchesOf() test matches against word list.
        test = new TernaryStringSet(ShortEnglishList.words)
        if (!areEquivalent(["I", "a",], test.getPartialMatchesOf("."))) {
            game.splash("Partials test 3a failed.")
            allPassed = false
        }
        if (!areEquivalent(["bean", "mean",], test.getPartialMatchesOf(".e.n"))) {
            game.splash("Partials test 3b failed.")
            allPassed = false
        }
        if (!areEquivalent([
            "chocolate",
            "expensive",
            "furniture",
            "introduce",
            "structure",
            "substance",
            "telephone",
            "therefore",
            "vegetable",
            "xylophone",
        ], test.getPartialMatchesOf("........e"))) {
            game.splash("Partials test 3c failed.")
            allPassed = false
        }
        if (!areEquivalent(["join", "jump", "just",], test.getPartialMatchesOf("j..."))) {
            game.splash("Partials test 3d failed.")
            allPassed = false
        }
        if (!areEquivalent(["juice", "quite",], test.getPartialMatchesOf(".u..e"))) {
            game.splash("Partials test 3e failed.")
            allPassed = false
        }
        if (!areEquivalent(["public",], test.getPartialMatchesOf("public"))) {
            game.splash("Partials test 3f failed.")
            allPassed = false
        }
        if (!areEquivalent([
            "bad",
            "bag",
            "can",
            "cap",
            "car",
            "cat",
            "day",
            "ear",
            "eat",
            "far",
            "hat",
            "man",
            "map",
            "may",
            "pan",
            "pay",
            "sad",
            "say",
            "was",
            "way",
        ], test.getPartialMatchesOf(".a."))) {
            game.splash("Partials test 3g failed.")
            allPassed = false
        }
        if (!areEquivalent([
            "comfortable",
            "examination",
            "grandfather",
            "grandmother",
        ], test.getPartialMatchesOf("..........."))) {
            game.splash("Partials test 3h failed.")
            allPassed = false
        }

        // getPartialMatchesOf() empty string handling.
        test = new TernaryStringSet()
        test.addAll(["", "a", "b",])
        if (!areEquivalent(["",], test.getPartialMatchesOf(""))) {
            game.splash("Partials test 4a failed.")
            allPassed = false
        }
        if (!areEquivalent(["a", "b",], test.getPartialMatchesOf("."))) {
            game.splash("Partials test 4b failed.")
            allPassed = false
        }
        if (!areEquivalent(["a",], test.getPartialMatchesOf("a"))) {
            game.splash("Partials test 4c failed.")
            allPassed = false
        }
        if (!areEquivalent(["b",], test.getPartialMatchesOf("b"))) {
            game.splash("Partials test 4d failed.")
            allPassed = false
        }

        // getPartialMatchesOf() matches with non-default "don't care."
        test = new TernaryStringSet()
        test.addAll(["c.t", "cat", "cot", "cup", "cut",])
        if (!areEquivalent([
            "c.t",
            "cat",
            "cot",
            "cut",
        ], test.getPartialMatchesOf("c?t", "?"))) {
            game.splash("Partials test 5a failed.")
            allPassed = false
        }
        if (!areEquivalent([
            "c.t",
            "cat",
            "cot",
            "cup",
            "cut",
        ], test.getPartialMatchesOf("c??", "?"))) {
            game.splash("Partials test 5b failed.")
            allPassed = false
        }
        if (!areEquivalent(["cup",], test.getPartialMatchesOf("##p", "#"))) {
            game.splash("Partials test 5c failed.")
            allPassed = false
        }
        return allPassed
    }

    function _completedBy(suffix: string, elements: string[]): string[] {
        const results: string[] = []
        for (const s of elements) {
            if (s.includes(suffix) && s.indexOf(suffix, s.length - suffix.length) == s.length - suffix.length) {
                results.push(s)
            }
        }
        return results
    }

    function _completions(prefix: string, elements: string[]): string[] {
        const results: string[] = []
        for (const s of elements) {
            if (s.includes(prefix) && s.indexOf(prefix) == 0) {
                results.push(s)
            }
        }
        return results
    }

    /**
     * Calculates the edi distance between two strings.
     */
    function editDist(from: string, to: string): number {
        /**
         * A standard Levenshtein distance function
         * like you'll find in any good algorithms book.
         */
        if (from.length == 0) {
            return to.length
        }
        if (to.length == 0) {
            return from.length
        }

        const v0: number[] = []
        const v1: number[] = []

        for (let i: number = 0; i < to.length + 1; i++) {
            v0[i] = i
        }
        for (let i: number = 0; i < from.length; i++) {
            v1[0] = i + 1

            for (let j: number = 0; j < to.length; j++) {
                const substcost = from[i] == to[j] ? 0 : 1
                v1[j + 1] = Math.min(Math.min(v1[j] + 1, v0[j + 1] + 1), v0[j] + substcost)
            }

            for (let j: number = 0; j < to.length + 1; j++) {
                v0[j] = v1[j]
            }
        }

        return v1[to.length]
    }

    /**
     * Verifies that `getWithinEditDist` returns the correct result
     * by checking the edit distance for every string in the set.
     */
    function editVerify(set: TernaryStringSet, pattern: string, dist: number, test: string): boolean {
        let toReturn: boolean = true
        const result = new TernaryStringSet(set.getWithinEditDistanceOf(pattern, dist))
        let count: number = 0
        for (const s of set.toArray()) {
            const d: number = editDist(pattern, s)
            if (result.has(s) != (d <= dist)) {
                game.showLongText(`Test ${test} element ${count} value ${s} failed; distance ${d} and dist ${dist} but has is ${result.has(s)}`,
                    DialogLayout.Full)
                toReturn = false
            }
            count++
        }
        return toReturn
    }

    function wordListTest(pattern: string, dist: number): boolean {
        let toReturn: boolean = true
        let set: TernaryStringSet = new TernaryStringSet(ShortEnglishList.words)
        if (!editVerify(set, pattern, dist, `Word list test ${pattern}`)) {
            toReturn = false
        }
        return toReturn
    }
}