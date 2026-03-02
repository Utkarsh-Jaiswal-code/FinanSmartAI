import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import React from "react";
function DashboardHeader() {
    return (
        <div className="p-5 shadow-sm norder-b flex justify-between">
            <div>

            </div>
            <div>
                <UserButton afterSignOutURL="/" />
            </div>
        </div>
    )
}
export default DashboardHeader;