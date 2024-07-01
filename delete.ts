namespace DeleteTests {
    export function run(): boolean {
        let test: TernaryStringSet
        let allPassed: boolean = true

        // delete() empty string.
        test = new TernaryStringSet()
        test.add("")
        test.add("horse")
        if (test.size != 2) {
            game.splash("Delete test 1a failed.")
            allPassed = false
        }
        if (!test.has("")) {
            game.splash("Delete test 1b failed.")
            allPassed = false
        }
        test.delete("")
        if (test.size != 1) {
            game.splash("Delete test 1c failed.")
            allPassed = false
        }
        if (test.has("")) {
            game.splash("Delete test 1d failed.")
            allPassed = false
        }

        // delete() non-member.
        test = new TernaryStringSet()
        if (test.size != 0) {
            game.splash("Delete test 2a failed.")
            allPassed = false
        }
        test.add("dog")
        if (test.size != 1) {
            game.splash("Delete test 2b failed.")
            allPassed = false
        }
        if (test.has("cat")) {
            game.splash("Delete test 2c failed.")
            allPassed = false
        }
        if (test.delete("cat")) {
            game.splash("Delete test 2d failed.")
            allPassed = false
        }
        if (test.size != 1) {
            game.splash("Delete test 2e failed.")
            allPassed = false
        }

        // delete() member
        test = new TernaryStringSet()
        if (test.size != 0) {
            game.splash("Delete test 3a failed.")
            allPassed = false
        }
        test.add("dog")
        if (test.size != 1) {
            game.splash("Delete test 3b failed.")
            allPassed = false
        }
        if (!test.has("dog")) {
            game.splash("Delete test 3c failed.")
            allPassed = false
        }
        if (!test.delete("dog")) {
            game.splash("Delete test 3d failed.")
            allPassed = false
        }
        if (test.size != 0) {
            game.splash("Delete test 3e failed.")
            allPassed = false
        }

        // delete() returns whether element was present.
        test = new TernaryStringSet()
        test.addAll(ShortEnglishList.words)
        ShortEnglishList.words.forEach((s: string) => {
            if (!test.delete(s)) {
                game.splash(`Delete test 4a failed for word ${s}.`)
                allPassed = false
            }
        })
        if (test.size != 0) {
            game.splash("Delete test 4b failed.")
            allPassed = false
        }
        if (test.delete("")) {
            game.splash("Delete test 4c failed.")
            allPassed = false
        }
        test.add("")
        if (test.delete("cat")) {
            game.splash("Delete test 4d failed.")
            allPassed = false
        }
        if (!test.delete("")) {
            game.splash("Delete test 4e failed.")
            allPassed = false
        }
        if (test.delete("cat")) {
            game.splash("Delete test 4f failed.")
            allPassed = false
        }

        // delete() multiple.
        test = new TernaryStringSet()
        test.addAll(ShortEnglishList.words)
        let size: number = test.size
        let count: number = 0
        let randomOrder: string[] = getShuffledWords()
        for (let w of randomOrder) {
            if (test.size != size) {
                game.splash(`Delete test 5a failed for word ${w} count ${count}.`)
                allPassed = false
            }
            size--
            if (!test.has(w)) {
                game.splash(`Delete test 5b failed for word ${w} count ${count}.`)
                allPassed = false
            }
            if (!test.delete(w)) {
                game.splash(`Delete test 5c failed for word ${w} count ${count}.`)
                allPassed = false
            }
            if (test.has(w)) {
                game.splash(`Delete test 5d failed for word ${w} count ${count}.`)
                allPassed = false
            }
            count++
        }
        if (test.size != 0) {
            game.splash("Delete test 5e failed.")
            allPassed = false
        }

        // deleteAll() deletes listed elements.
        test = new TernaryStringSet()
        test.addAll(ShortEnglishList.words)
        size = test.size
        test.deleteAll(null)
        if (test.size != size) {
            game.splash("Delete test 6a failed.")
            allPassed = false
        }
        test.deleteAll([])
        if (test.size != size) {
            game.splash("Delete test 6b failed.")
            allPassed = false
        }
        test.deleteAll(["bear",])
        if (test.size != size - 1) {
            game.splash("Delete test 6c failed.")
            allPassed = false
        }
        test.deleteAll(["chicken", "elephant",])
        if (test.size != size - 3) {
            game.splash("Delete test 6d failed.")
            allPassed = false
        }
        for (let w of ["bear", "chicken", "elephant",]) {
            if (test.has(w)) {
                game.splash(`Delete test 6e failed for word ${w}.`)
                allPassed = false
            }
        }
        test.deleteAll(["goat", "hen",])
        if (test.size != size - 5) {
            game.splash("Delete test 6f failed.")
            allPassed = false
        }

        // deleteAll() returns true if all requested elements removed.
        test = new TernaryStringSet()
        test.addAll(ShortEnglishList.words)
        if (test.size != ShortEnglishList.words.length) {
            game.splash("Delete test 7a failed.")
        }
        if (!test.deleteAll(ShortEnglishList.words)) {
            game.splash("Delete test 7b failed.")
        }
        if (test.size != 0) {
            game.splash("Delete test 7c failed.")
        }
        test.addAll(["fish", "gerbil", "pigeon",])
        if (test.size != 3) {
            game.splash("Delete test 7d failed.")
        }
        if (test.deleteAll(["gerbil", "mongoose", "pigeon",])) {
            game.splash("Delete test 7e failed.")
        }
        test.addAll(["fish", "gerbil", "pigeon",])
        if (test.deleteAll(["mongoose", "gerbil", "pigeon,"])) {
            game.splash("Delete test 7f failed.")
        }
        test.addAll(["fish", "gerbil", "pigeon",])
        if (test.deleteAll(["gerbil", "pigeon", "mongoose",])) {
            game.splash("Delete test 7g failed.")
        }
        test.addAll(["fish", "gerbil", "pigeon",])
        if (test.deleteAll(["mongoose",])) {
            game.splash("Delete test 7h failed.")
        }
        test.addAll(["fish", "gerbil", "pigeon",])
        if (!test.deleteAll(["gerbil", "pigeon",])) {
            game.splash("Delete test 7i failed.")
        }
        
        return allPassed
    }

    function getShuffledWords(): string[] {
        let shuffled: string[] = ShortEnglishList.words.slice()
        let len: number = shuffled.length
        for (let i: number = 0; i < len; i++) {
            let swapIndex: number = randint(0, len - 1)
            if (i != swapIndex) {
                let temp: string = shuffled[i]
                shuffled[i] = shuffled[swapIndex]
                shuffled[swapIndex] = temp
            }
        }
        return shuffled
    }
}