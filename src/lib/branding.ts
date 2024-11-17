
interface Branding {
    brand: string;
    site: string;
}

export function getBranding(): Branding {
    return {
        brand: import.meta.env.PB_BRAND,
        site: import.meta.env.SITE
    }
}