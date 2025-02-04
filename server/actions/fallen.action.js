import * as service from '@/server/service/fallen.service.js';

export async function getFallenById(id) {
    return await service.getFallenById(id);
}

export async function getAllFallen() {
    return await service.getAllFallen();
}

export async function addFallen(fallen) {
    return await service.addFallen(fallen);
}

export async function updateFallen(fallen) {
    return await service.updateFallen(fallen);
}

export async function deleteFallen(id) {
    return await service.deleteFallen(id);
}
