import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "https://databaseufest.aureliusivan.my.id/api";

localStorage.getItem('LoginID') ? axiosClient.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem('LoginID')}`,
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
}
    :
    axiosClient.defaults.headers = {
        // Authorization: `Bearer ${localStorage.getItem('LoginID')}`,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json', 
    };


axiosClient.defaults.timeout = 10000;

axiosClient.defaults.withCredentials = false;


export function getRequest(URL) {
    return axiosClient.get(`/${URL}`).then(response => response);
}

export function postRequest(URL, payload) {
    return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export function patchRequest(URL, payload) {
    return axiosClient.patch(`/${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
    return axiosClient.delete(`/${URL}`).then(response => response);
}

export function UpostRequest(URL, payload) {
    return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export function postPreUlympicRegistration(payload) {
    const formData = new FormData();
    formData.append('teamName', payload.teamName);
    formData.append('numberOfPlayers', payload.numberOfPlayers);
    // menambahkan cookie pada payload
    formData.append('namaTim', payload.namaTim);
    formData.append('jumlahAnggota', payload.jumlahAnggota);

    return axiosClient.post(`/${URL}`, formData).then((response) => response);
}