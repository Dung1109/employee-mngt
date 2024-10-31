import Link from "next/link";
import AddEmployeeForm from "@/components/add-employee-form";

export default function AddEmployee() {
    return (
        <div className="flex bg-gray-100">
            <aside className="w-64 bg-white p-6 shadow-md">
                <h1 className="text-2xl font-bold mb-6">Employee</h1>
                <nav>
                    <ul className="space-y-2">
                        <li><Link href="/" className="text-blue-600">Dashboard</Link></li>
                        <li>
                            <details open>
                                <summary className="cursor-pointer text-blue-600">Employee Manager</summary>
                                <ul className="ml-4 mt-2 space-y-1">
                                    <li><a href="#" className="text-blue-600">Employee List</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><Link href={"/employee/add"} className="text-blue-600">Add Employee</Link></li>
                    </ul>
                </nav>
            </aside>
            <AddEmployeeForm />
        </div>
    );
}