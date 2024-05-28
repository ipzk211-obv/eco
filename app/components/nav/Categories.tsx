"use client"
import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";
import { useSearchParams, usePathname } from "next/navigation";

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();
    const isMainPage = pathname == "/catalog";
    if (!isMainPage) return null;
    return (
        <div className="bg-slate-50 w-full">
            <Container>
                <div className="flex flex-col">
                    {categories.map((item) => (
                        <Category
                            key={item.label}
                            lable={item.label}
                            icon={item.icon}
                            selected={category == item.label || (category == null && item.label == "Всі товари")}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Categories;
