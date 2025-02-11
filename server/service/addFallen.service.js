import { db } from "@/server/db";
import { uploadImage } from "@/server/actions/uploadImage.action";

export async function addFallen(fallenData) {
    try {
        // Upload image if exists
        const imageUrl = fallenData.imageFile ? await uploadImage(fallenData.imageFile) : null;

        const [firstName, ...lastNameParts] = fallenData.fullName.trim().split(" ");
        const lastName = lastNameParts.join(" ");

        const hobbies = fallenData.hobbies
            .split(',')
            .map(hobby => hobby.trim())
            .filter(hobby => hobby)
            .map(name => ({ name, continueCount: 0 }));

        const newFallen = await db.fallen.create({
            data: {
                firstName,
                lastName,
                birthDate: new Date(fallenData.birthYear),
                deathDate: new Date(fallenData.deathDate),
                hobbies,
                about: fallenData.about,
                familyWords: fallenData.familyMessage,
                highlightQuote: fallenData.highlightQuote,
                imageUrl,
                isAccepted: false
            }
        });

        return newFallen;
    } catch (error) {
        console.error("Error in addFallen service:", error);
        throw error;
    }
}