namespace Serialization {
    export function run(): boolean {
        let allPassed: boolean = true
        let test: TernaryStringSet

        // toBuffer() empty tree has header only.
        test = new TernaryStringSet()
        if (test.toBuffer().byteLength != 8) {
            game.splash("Serialization test 1 failed.")
            allPassed = false
        }

        // toBuffer() non-empty tree has node bytes.
        test = new TernaryStringSet()
        test.add("a")
        // HEADER + 1 node enc. + 1 char + 0 * 3 branches.
        if (test.toBuffer().byteLength != (8 + 2)) {
            game.splash("Serialization test 2a failed.")
            allPassed = false
        }
        if (!roundTrip(test, "Serialization test 2b")) {
            allPassed = false
        }
        // HEADER + 1 node enc. + 2 char + 0 * 3 branches.
        test.clear()
        test.add("ɑ")
        if (test.toBuffer().byteLength != (8 + 3)) {
            game.splash("Serialization test 2c failed.")
            allPassed = false
        }
        if (!roundTrip(test, "Serialization test 2d")) {
            allPassed = false
        }
        // HEADER + 1 node enc. + 3 char + 0 * 3 branches.
        // Fails on 32-bit Unicode characters.
        /*
        test.clear()
        test.add("𝄞")
        if (test.toBuffer().byteLength != (8 + 4)) {
            game.splash("Serialization test 2e failed.")
            allPassed = false
        }
        if (!roundTrip(test, "Serialization test 2f")) {
            allPassed = false
        }
        */

        // roundtrip on a small set.
        test = new TernaryStringSet()
        test.addAll(["", "apple", "ankle", "ball", "pi", "piano", "pink", "ukulele",])
        if (!roundTrip(test, "Serialization test 3a")) {
            allPassed = false
        }
        test.compact()
        if (!roundTrip(test, "Serialization test 3b")) {
            allPassed = false
        }

        // roundtrip on a large set.
        test = new TernaryStringSet()
        test.addAll(ShortEnglishList.words)
        if (!roundTrip(test, "Serialization test 4a")) {
            allPassed = false
        }
        test.compact()
        if (!roundTrip(test, "Serialization test 4b")) {
            allPassed = false
        }

        // roundtrip sets with wide cp/branch values.
        // Fails on wide characters.
        /*
        const s: string[] = []
        for (let cp: number = 0; cp < 0x100ff; cp++) {
            s.push(String.fromCharCode(cp))
        }
        test = new TernaryStringSet(s)
        if (!roundTrip(test, "Serialization test 5a")) {
            allPassed = false
        }
        test.clear()
        s.map((t) => `${t}s`)
        test.addAll(s)
        if (!roundTrip(test, "Serialization test 5b")) {
            allPassed = false
        }
        test.clear()
        s.map((t) => `p${t}`)
        test.addAll(s)
        if (!roundTrip(test, "Serialization test 5c")) {
            allPassed = false
        }
        */

        return allPassed
    }

    function roundTrip(set: TernaryStringSet, testName: string): boolean {
        let passed: boolean = true
        const buff: ArrayBuffer = set.toBuffer()
        const set2: TernaryStringSet = TernaryStringSet.fromBuffer(buff)
        if (!areSetsEqual(set, set2)) {
            game.splash(`${testName} sets equivalence test failed.`)
            passed = false
        }
        if (!areStatsEqual(set, set2)) {
            game.splash(`${testName} set stats equivalence test failed.`)
            passed = false
        }
        return passed
    }
}