export const objectToFormData = (obj: Record<string, any>, formData: FormData = new FormData(), parentKey?: string): FormData => {
    if (obj && typeof obj === 'object' && !(obj instanceof File)) {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const fullKey = parentKey ? `${parentKey}[${key}]` : key;

            if (value instanceof File) {
                formData.append(fullKey, value);
            } else if (Array.isArray(value) && value.length > 0) {
                value.forEach((item, index) => {
                    objectToFormData({ [`${index}`]: item }, formData, fullKey);
                });
            } else if (typeof value === 'object' && value !== null) {
                objectToFormData(value, formData, fullKey);
            } else if (value !== undefined && value !== null && value !== '') {
                formData.append(fullKey, value.toString());
            }
        });
    }
    return formData;
};

export const requestInit = (method: string, payload?: Record<string, any>) => {

    const header = {
        "X-XSRF-TOKEN": decodeURIComponent(document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN="))?.split("=")[1] || ""),
        "Accept": "application/json"
    }

    const init: RequestInit = {
        method: method === "GET" ? "GET" : "POST",
        headers: header,
        credentials: 'include',
        body: method === 'GET' ? null : objectToFormData({ ...payload, _method: method })
    };

    return init;
}

