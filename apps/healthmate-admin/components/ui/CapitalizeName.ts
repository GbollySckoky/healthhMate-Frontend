export const CapitalizeName = (name: string | undefined) => {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
}