import { connectToDB } from "@/server/connect";
import { getAllFallen } from "@/server/service/fallen.service";


import FallenTable from "../components/FallenTable";

export default async function AdminPage() {
    await connectToDB();
    const fallenData = await getAllFallen();

    return (
        <>
            <FallenTable fallenData={fallenData} />
        </>
    )
}
