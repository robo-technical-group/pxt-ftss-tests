/**
 * Simple tests
 * Create full test suite once something like Jest has been implemented.
 */
let allPassed: boolean = true

if (!ConstructorTests.run()) {
    allPassed = false
}

if (!AddHasTests.run()) {
    allPassed = false
}

if (!ClearTests.run()) {
    allPassed = false
}

if (!SizeTests.run()) {
    allPassed = false
}

if (!DeleteTests.run()) {
    allPassed = false
}

if (!StatsTests.run()) {
    allPassed = false
}

if (!Approx.run()) {
    allPassed = false
}

// Show summary.
if (allPassed) {
    game.splash("All tests passed!")
} else {
    game.splash("At least one test failed.")
}