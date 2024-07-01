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
        return allPassed
    }
}