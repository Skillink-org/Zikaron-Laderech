const users = [
    {
        id: 0,
        firstName: "מאי",
        lastName: "הלל",
        image: "/profileImage.webp",
        email: "chay6865@gmail.com",
        password: "123456"
    },
    {
        id: 1,
        firstName: "מאי",
        lastName: "הלל",
        image: "/profileImage.webp",
        email: "b3206003@gmail.com",
        password: "654321"
    },
]
export function getUserByEmail(email) {
    const user = users.find(user => user.email === email);
    if (user)
        return user;
    return { status: 404, message: "user not found" }
}