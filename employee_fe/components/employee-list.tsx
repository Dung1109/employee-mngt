"use client"

import { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Eye, Loader2} from "lucide-react"
import { useRouter } from 'next/navigation'
import Link from "next/link";

// Employee interface matching the Spring Boot API
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  departmentName: string;
  remark: string;
  _links: {
    self: { href: string };
  };
}

interface EmployeeResponse {
  _embedded: {
    employees: Employee[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

// Function to fetch employees from the backend
const fetchEmployees = async ({ pageParam = 1, searchTerm = '', filterBy = 'firstName' }): Promise<EmployeeResponse> => {
  const { data } = await axios.get('http://localhost:8080/api/employees', {
    params: { page: pageParam - 1, search: searchTerm, filterBy } // Note: page is 0-based in the backend
  });
  return data;
}

// Function to log out a user
const logoutUser = async () => {
  await axios.post('http://localhost:8080/api/logout');
}

function EmployeeListContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('firstName');
  const [page, setPage] = useState(1);
  const router = useRouter();

  // React Query for fetching employee data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['employees', page, searchTerm, filterBy],
    queryFn: () => fetchEmployees({ pageParam: page, searchTerm, filterBy }),
  });

  // React Query for logging out the user
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      router.push('/login');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  }

  const handleSearch = () => {
    setPage(1); // Reset to first page when searching
  }

  return (
      <div className="flex h-screen bg-gray-100">
        <aside className="w-64 bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-6">Employee</h1>
          <nav>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-600">Dashboard</a></li>
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
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Employee List</h2>
            <div>
              <span className="mr-2">Welcome kasjd</span>
              <Button
                  variant="outline"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                />
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="firstName">First Name</SelectItem>
                    <SelectItem value="lastName">Last Name</SelectItem>
                    <SelectItem value="departmentName">Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : isError ? (
                <div className="text-center text-red-500">Error loading employees</div>
            ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date of Birth</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?._embedded?.employees.map((employee) => (
                          <TableRow key={employee._links.self.href}>
                            <TableCell>{employee.id}</TableCell>
                            <TableCell>{employee.firstName + ' ' + employee.lastName}</TableCell>
                            <TableCell>{employee.dateOfBirth}</TableCell>
                            <TableCell>{employee.address}</TableCell>
                            <TableCell>{employee.phone}</TableCell>
                            <TableCell>{employee.departmentName}</TableCell>
                            <TableCell>
                              <Button variant="link"><Eye />View</Button>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-center mt-4 space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                      Previous
                    </Button>
                    {[...Array(data?.page.totalPages || 0)].map((_, index) => (
                        <Button
                            key={index}
                            variant={page === index + 1 ? "default" : "outline"}
                            onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === data?.page.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </>
            )}
          </div>
        </main>

      </div>
  );
}

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Wrap the main component with QueryClientProvider
export function EmployeeListComponent() {
  return (
      <QueryClientProvider client={queryClient}>
        <EmployeeListContent />
      </QueryClientProvider>
  );
}
