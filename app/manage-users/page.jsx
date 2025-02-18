import { connectToDB } from "@/server/connect";
import { getAllUsers } from "@/server/service/user.service";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import UsersTable from "../components/UsersTable";

export default async function ManageUsersPage() {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    await connectToDB();
    const usersData = await getAllUsers();

    return (
        <>
            <UsersTable usersData={usersData} />
        </>
    )
}
