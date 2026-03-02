import React, { useEffect } from "react";
import Image from "next/image";
import {
    LayoutGrid,
    PiggyBank,
    ReceiptText,
    ShieldCheck,
    CircleDollarSign,
} from 'lucide-react'

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutGrid,
            path: "/dashboard"
        },
        {
            id: 2,
            name: "Incomes",
            icon: CircleDollarSign,
            path: "/dashboard/incomes"
        },
        {
            id: 3,
            name: "Budgets",
            icon: PiggyBank,
            path: "/dashboard/budgets"
        },
        {
            id: 4,
            name: "Expenses",
            icon: ReceiptText,
            path: "/dashboard/expenses"
        },
        {
            id: 5,
            name: "Upgrade",
            icon: ShieldCheck,
            path: "/dashboard/upgrade"
        }
    ];

    const path = usePathname()
    useEffect(
        () => {
            console.log(path)
        }, [path]
    );
    return (
        <aside className="h-screen p-6 border-r bg-white shadow-sm w-60">
            <div className="flex items-center gap-3 mb-6">
                <Image src={'/finan-logo.svg'} alt="logo" width={36} height={36} />
                <span className="text-sky-700 font-extrabold text-lg">FinanSmartAI</span>
            </div>

            <nav className="space-y-1">
                {menuList.map((menu) => {
                    const Icon = menu.icon;
                    const isActive = path === menu.path || path?.startsWith(menu.path + "/");
                    return (
                        <Link href={menu.path} key={menu.id} className={`flex items-center gap-3 text-sm px-3 py-2 rounded-lg ${isActive ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-sky-600'}`}>
                            <Icon className="w-5 h-5" />
                            <span>{menu.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

export default SideNav;