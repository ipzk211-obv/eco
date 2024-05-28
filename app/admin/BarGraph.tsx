"use client"
import { SafeUser } from "@/types";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, scales } from "chart.js";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
 interface BarGraphProps{
    data: GraphData[];
    currentUser: SafeUser | null;
 }
 type GraphData = {
    day: string;
    date: string;
    totalAmount: number;

 }
const BarGraph: React.FC<BarGraphProps> = ({data, currentUser}) => {
    const pathname = usePathname();
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(true); 

    useEffect(() => {
        if (currentUser == null || currentUser.role !== "ADMIN") {
            router.push('/');
        } else {
            setRedirecting(false); 
        }
    }, [currentUser, router]);

    if (redirecting) {
        return null;
    }
    const labels = data.map(item => item.day)
    const amount = data.map(item => item.totalAmount)
    
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Сума продаж",
                data: amount,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1 
            }
        ]
    }
    const options = {
        scales:{
            y:{
                beginAtZero: true
            }
        }
    }
    return ( <Bar data={chartData} options={options}></Bar> );
}
 
export default BarGraph;