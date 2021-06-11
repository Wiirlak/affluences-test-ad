import axios from 'axios';

export async function get<T>(endpoint: string, params: { [key: string]: unknown } = null): Promise<T> {
    const endpointUrl = process.env.RESERVATION_URL + endpoint;
    try {
        const res = await axios.get(endpointUrl, {params: params});
        return res.data;
    } catch (err) {
        await Promise.reject({error: err.message});
    }
}
