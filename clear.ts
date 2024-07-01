namespace ClearTests {
    export function run(): boolean {
        let test: TernaryStringSet
        let allPassed: boolean = true

        // Clear() creates an empty tree.
        test = new TernaryStringSet()
        if (test.size != 0) {
            game.splash("Clear test 1a failed.")
            allPassed = false
        }
        test.clear()
        if (test.size != 0) {
            game.splash("Clear test 1b failed.")
            allPassed = false
        }

        // Clear a non-empty tree.
        test = new TernaryStringSet()
        test.addAll(["chicken", "duck", "whale",])
        if (test.size != 3) {
            game.splash("Clear test 2a failed.")
            allPassed = false
        }
        test.clear()
        if (test.size != 0) {
            game.splash("Clear test 2b failed.")
            allPassed = false
        }

        // Clear with an empty string.
        test = new TernaryStringSet()
        test.add("horse")
        test.add("")
        if (test.size != 2) {
            game.splash("Clear test 3a failed.")
            allPassed = false
        }
        test.clear()
        if (test.size != 0) {
            game.splash("Clear test 3b failed.")
            allPassed = false
        }
        
        return allPassed
    }
}