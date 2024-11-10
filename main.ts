/**
 * Simple tests
 * Create full test suite once something like Jest has been implemented.
 */
let allPassed: boolean = true

let tests: (() => boolean)[] = [
    ConstructorTests.run,
    AddHasTests.run,
    ClearTests.run,
    SizeTests.run,
    DeleteTests.run,
    StatsTests.run,
    Approx.run,
    Balance.run,
    Compact.run,
    Serialization.run,
    GetTests.run,
]

for (let t of tests) {
    if (!t()) {
        allPassed = false
    }
}

// Show summary.
if (allPassed) {
    game.splash("All tests passed!")
} else {
    game.splash("At least one test failed.")
}