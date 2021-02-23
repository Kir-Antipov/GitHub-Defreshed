/**
 * Available engines.
 */
enum Engines {
    /**
     * Original engine completely replaces
     * the GitHub navigation system with dynamic page loading.
     */
    Original = "original",

    /**
     * Pjax engine was designed to be compatible with other
     * scripts/extensions (e.g. "Refined GitHub")
     * and is based on listening for pjax events.
     */
    Pjax = "pjax",
}

export default Engines;
