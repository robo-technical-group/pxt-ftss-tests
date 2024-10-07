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
}