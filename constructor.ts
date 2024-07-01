namespace ConstructorTests {
    export function run(): boolean {
        let test: TernaryStringSet = new TernaryStringSet()
        let allPassed: boolean = true

        if (test.size != 0) {
            game.splash("Constructor test 1 failed.")
            allPassed = false
        }

        test = new TernaryStringSet([])
        if (test.size != 0) {
            game.splash("Constructor test 2 failed.")
            allPassed = false
        }

        return allPassed
    }
}