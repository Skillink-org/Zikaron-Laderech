'use server'

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

export async function joinHobby(fallenId, hobby) {
    const response = await service.updateFallen({ '_id': fallenId, 'hobbies.name': hobby }, { '$inc': { 'hobbies.$.continueCount': 1 } });
    if (!response) {
        return {
            ok: false,
            message: 'Failed to join hobby',
            status: 400
        };
    }
    return {
        ok: true,
        message: 'Successfully joined hobby',
        status: 200
    };
}