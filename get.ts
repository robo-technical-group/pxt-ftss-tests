namespace GetTests {
    export function run(): boolean {
        let allPassed: boolean = true
        let test: TernaryStringSet = new TernaryStringSet()

        // Get() on an empty set will be null.
        if (test.get(0) !== null) {
            game.splash("Get test 1 failed.")
            allPassed = false
        }

        test.add("")
        if (test.get(0) !== "") {
            game.splash("Get test 2 failed.")
            allPassed = false
        }

        test.clear()
        test.addAll(ShortEnglishList.words)
        console.log("Get random words from short word list.")
        for (let count: number = 0; count < 100; count++) {
            let index: number = randint(0, test.size - 1)
            let word: string = test.get(index)
            console.log(word)
            if (word.length == 0) {
                game.splash(`Get test 3 count ${count} failed; index = ${index}.`)
                allPassed = false
            }
        }

        return allPassed
    }
}