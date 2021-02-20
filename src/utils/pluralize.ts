/**
 * Returns a plural form of the value if the count requires it.
 *
 * NOTE:
 * This function does NOT cover all possible cases,
 * it works only for the simplest ones that are needed for the project.
 */
export default function pluralize(value: string, count: number | string) {
    count = isNaN(count as number) ? -1 : +count;
    if (count < 0 || count === 1) {
        return value;
    }

    if (
        value.endsWith("s") ||
        value.endsWith("sh") ||
        value.endsWith("ch") ||
        value.endsWith("x") ||
        value.endsWith("z")
    ) {
        return value + "es";
    }

    return value + "s";
}