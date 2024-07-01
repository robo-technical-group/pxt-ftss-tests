namespace SizeTests {
    export function run(): boolean {
        let test: TernaryStringSet
        let allPassed: boolean = true

        // size() not double counted.
        test = new TernaryStringSet()
        if (test.size != 0) {
            game.splash("Size test 1a failed.")
            allPassed = false
        }
        test.add("peach")
        if (test.size != 1) {
            game.splash("Size test 1b failed.")
            allPassed
        }
        test.add("peach")
        if (test.size != 1) {
            game.splash("Size test 1c failed.")
            allPassed
        }

        // size() not double deleted.
        test = new TernaryStringSet()
        if (test.size != 0) {
            game.splash("Size test 2a failed.")
            allPassed = false
        }
        test.add("peach")
        if (test.size != 1) {
            game.splash("Size test 2b failed.")
            allPassed
        }
        test.delete("peach")
        if (test.size != 0) {
            game.splash("Size test 2c failed.")
            allPassed = false
        }
        test.delete("peach")
        if (test.size != 0) {
            game.splash("Size test 2d failed.")
            allPassed = false
        }

        // size with empty string.
        test = new TernaryStringSet()
        if (test.size != 0) {
            game.splash("Size test 3a failed.")
            allPassed = false
        }
        test.add("")
        if (test.size != 1) {
            game.splash("Size test 3b failed.")
            allPassed = false
        }
        test.add("")
        if (test.size != 1) {
            game.splash("Size test 3c failed.")
            allPassed = false
        }
        test.delete("")
        if (test.size != 0) {
            game.splash("Size test 3d failed.")
            allPassed = false
        }
        test.delete("")
        if (test.size != 0) {
            game.splash("Size test 3e failed.")
            allPassed = false
        }
        test.add("")
        if (test.size != 1) {
            game.splash("Size test 3f failed.")
            allPassed = false
        }
        test.add("whale")
        if (test.size != 2) {
            game.splash("Size test 3g failed.")
            allPassed = false
        }

        // size accurate after addAll() of word list.
        test = new TernaryStringSet()
        if (test.size != 0) {
            game.splash("Size test 4a failed.")
            allPassed = false
        }
        test.addAll(ShortEnglishList.words)
        let len: number = ShortEnglishList.words.length
        if (test.size != len) {
            game.splash("Size test 4b failed.")
            allPassed = false
        }
        // test.balance()
        if (test.size != len) {
            game.splash("Size test 4c failed.")
            allPassed = false
        }
        // test.compact()
        if (test.size != len) {
            game.splash("Size test 4d failed.")
            allPassed = false
        }
        let i: number = 0
        for (const el of ShortEnglishList.words) {
            test.delete(el)
            i++
            if (test.size != len- i){
                game.splash(`Size test 4e failed at count ${i}.`)
                allPassed = false
            }
        }
        for (const el of ShortEnglishList.words) {
            test.delete(el)
            if (test.size != 0) {
                game.splash(`Size test 4f failed at word ${el}.`)
                allPassed = false
            }
        }

        return allPassed
    }
}