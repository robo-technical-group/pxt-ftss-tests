namespace AddHasTests {
    export function run(): boolean {
        let test: TernaryStringSet
        let allPassed: boolean = true

        // Test add empty string
        test = new TernaryStringSet()
        test.add("")
        if (test.size != 1) {
            game.splash("Add/Has test 1a failed.")
            allPassed = false
        }
        if (!test.has("")) {
            game.splash("Add/Has test 1b failed.")
            allPassed = false
        }
        if (test.has("c")) {
            game.splash("Add/Has test 1c failed.")
            allPassed = false
        }

        // Add length 1 string.
        test = new TernaryStringSet()
        test.add("a")
        if (!test.has("a")) {
            game.splash("Add/Has test 2a failed.")
            allPassed = false
        }
        for (let t of ["", "c", "aa"]) {
            if (test.has(t)) {
                game.splash(`Add/Has test 2b (${t}) failed.`)
                allPassed = false
            }
        }

        // Add singleton.
        test = new TernaryStringSet()
        test.add("cat")
        if (test.size != 1) {
            game.splash("Add/Has test 3a failed.")
            allPassed = false
        }
        if (!test.has("cat")) {
            game.splash("Add/Has test 3b failed.")
            allPassed = false
        }
        for (let t of ["", "c", "cc", "ca", "caa", "cats"]) {
            if (test.has(t)) {
                game.splash(`Add/Has test 3c (${t}) failed.`)
                allPassed = false
            }
        }

        // Multiple words
        test = new TernaryStringSet()
        const words = [
            "moose",
            "dolphin",
            "caribou",
            "emu",
            "snake",
            "zebra",
            "narwhal",
        ]
        words.forEach((s) => {
            test.add(s)
            if (!test.has(s)) {
                game.splash(`Add/Has test 4a (${s}) failed.`)
                allPassed = false
            }
        })
        words.forEach((s) => {
            if (!test.has(s)) {
                game.splash(`Add/Has test 4b (${s}) failed.`)
                allPassed = false
            }
        })
        if (test.size != words.length) {
            game.splash("Add/Has test 4c failed.")
            allPassed = false
        }

        function addAll(testName: string, args: string[]): void {
            test = new TernaryStringSet()
            test.addAll(args)
            if (test.size != args.length) {
                game.splash(`Add/Has size test ${testName} failed.`)
                allPassed = false
            }
            args.forEach((s) => {
                if (!test.has(s)) {
                    game.splash(`Add/Has search test ${testName} for ${s} failed.`)
                    allPassed = false
                }
            })
        }

        for (let t of [[], ["ape",], ["ape", "cat",], ["ape", "cat", "eel",]]) {
            addAll(`Add/Has test 6 with length ${t.length}`, t)
        }

        // addAll with duplicate words yields the correct size.
        test = new TernaryStringSet()
        test.addAll([
            "antelope",
            "crab",
            "porcupine",
            "crab",
            "crab",
            "crab",
            "antelope",
            "porcupine",
        ])
        if (test.size != 3) {
            game.splash("Add/Has test 7 failed.")
            allPassed = false
        }

        // addAll with complex strings.
        test = new TernaryStringSet()
        test.addAll([
            "Mt. Doom",
            "a dog—smelly",
            "line 1\nline2",
            "🙂",
            "I have a pet 🐈",
            "good 🍀 luck!",
            "程序设计员在用电脑。",
            "𝄞𝅘𝅥𝅘𝅥𝅮𝅘𝅥𝅯𝅘𝅥𝅰𝄽",
            "The \0 NUL Zone",
            "max code point \udbff\udfff",
        ])
        if (test.size == 0) {
            game.splash("Add/Has test 8a failed.")
            allPassed = false
        }
        if (test.size != 10) {
            game.splash("Add/Has test 8b failed.")
            allPassed = false
        }

        // addAll tests with ranges.
        test = new TernaryStringSet()
        test.addAll([])
        if (test.size != 0) {
            game.splash("Add/Has test 9a failed.")
            allPassed = false
        }
        test.addAll(["mongoose",])
        if (test.size != 1) {
            game.splash("Add/Has test 9b failed.")
            allPassed = false
        }
        test.addAll(["badger", "pelican",], 0, 2)
        if (test.size != 3) {
            game.splash("Add/Has test 9c failed.")
            allPassed = false
        }
        test.addAll(["asp", "mouse", "oyster",], 1, 3)
        if (test.size != 5) {
            game.splash("Add/Has test 9d failed.")
            allPassed = false
        }
        if (test.has("asp")) {
            game.splash("Add/Has test 9e failed.")
            allPassed = false
        }
        test.addAll(["barracuda", "cricket", "panda", "tiger",], 0, 2)
        if (test.size != 7) {
            game.splash("Add/Has test 9f failed.")
            allPassed = false
        }
        if (!test.has("barracuda") || !test.has("cricket")) {
            game.splash("Add/Has test 9g failed.")
            allPassed = false
        }
        if (test.has("panda") || test.has("tiger")) {
            game.splash("Add/Has test 9h failed.")
            allPassed = false
        }
        test.addAll(["bison", "caribou", "deer", "elk", "moose",], 1)
        if (test.size != 11) {
            game.splash("Add/Has test 9i failed.")
            allPassed = false
        }
        if (test.has("bison")) {
            game.splash("Add/Has test 9j failed.")
            allPassed = false
        }
        if (!test.has("caribou") || !test.has("moose")) {
            game.splash("Add/Has test 9k failed.")
            allPassed = false
        }

        // addAll() with bad indices.
        test = new TernaryStringSet()
        try {
            test.addAll(["badger",], -1)
            game.splash("Add/Has test 10a failed.")
            allPassed = false
        } catch {

        }
        try {
            test.addAll(["asp",], 0.5)
            game.splash("Add/Has test 10b failed.")
            allPassed = false
        } catch {

        }
        try {
            test.addAll(["pig",], NaN)
            game.splash("Add/Has test 10c failed.")
            allPassed = false
        } catch {

        }
        try {
            test.addAll(["hare",], 2)
            game.splash("Add/Has test 10d failed.")
            allPassed = false
        } catch {

        }
        try {
            test.addAll(["ox",], 0, -1)
            game.splash("Add/Has test 10e failed.")
            allPassed = false
        } catch {

        }
        try {
            test.addAll(["wolf",], 0, 0.5)
            game.splash("Add/Has test 10f failed.")
            allPassed = false
        } catch {

        }
        try {
            test.addAll(["spider",], 0, NaN)
            game.splash("Add/Has test 10g failed.")
            allPassed = false
        } catch {

        }
        try {
            test.addAll(["carp",], 0, 2)
            game.splash("Add/Has test 10h failed.")
            allPassed = false
        } catch {

        }

        // addAll() from short English list.
        test = new TernaryStringSet()
        test.addAll(ShortEnglishList.words)
        if (test.size != ShortEnglishList.words.length) {
            game.splash("Add/Has test 11a failed.")
            allPassed = false
        }
        ShortEnglishList.words.forEach((s: string) => {
            if (!test.has(s)) {
                game.splash(`Add/Has test 11b failed for word ${s}.`)
                allPassed = false
            }
        })
        
        return allPassed
    }
}