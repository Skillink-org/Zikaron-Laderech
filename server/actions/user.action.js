const users = [
    {
        id: 0,
        firstName: "חיה",
        lastName: "יונגרמן",
        image: "/profileImage.webp",
        email: "chay6865@gmail.com",
        password: "123456"
    },
    {
        id: 1,
        firstName: "מאי",
        lastName: "הלל",
        image: "/profileImage.webp",
        email: "may.example@gmail.com",
        password: "654321"
    },
    {
        id: 2,
        firstName: "שחף",
        lastName: "נוקד",
        image: "/profileImage.webp",
        email: "shahafnoked@gmail.com",
        password: "123123"
    },
]
export function getUserByEmail(email) {
    const user = users.find(user => user.email === email);
    if (user)
        return user;
    return { status: 404, message: "user not found" }
}