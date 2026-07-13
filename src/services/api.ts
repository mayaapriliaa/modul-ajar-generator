const API_URL = "http://127.0.0.1:8000/api";

export async function generateModul(payload: any) {
    const response = await fetch(`${API_URL}/modul-ajar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok || data.status === false) {
        throw new Error(data.message || "Generate Modul gagal.");
    }

    return data;
}