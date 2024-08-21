import AddziartnamehPage from "@/template/AddziartnamehPage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "src/components/lib/auth";

const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    console.log(session);
    
    if ( !session ) redirect("/")

    return ( <AddziartnamehPage /> );
};

export default page;