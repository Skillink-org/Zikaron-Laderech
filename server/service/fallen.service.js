import Fallen from '@/server/models/fallen.model';


export async function getAllFallen() {
  return await Fallen.find({});
}

export async function getFilteredFallen(query) {
  return Fallen.filter(
    (fallen) =>
      fallen.firstName.includes(query) ||
      fallen.lastName.includes(query) ||
      fallen.hobbies.includes(query)
  );
}

export async function getFallenById(id) {
  try {
    return await Fallen.findById(id);
  }
  catch (error) {
    console.log(error)
  }
}

export async function addFallen(fallen) {
  return await Fallen.create(fallen);
}

export async function updateFallen(fallen) {
  return await Fallen.findByIdAndUpdate(fallen.id, fallen);
}

export async function deleteFallen(id) {
  return await Fallen.findByIdAndDelete(id);
} 