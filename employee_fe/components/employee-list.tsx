"use client"

import { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'

interface Employee {
  id: number
  name: string
  dateOfBirth: string
  address: string
  phoneNumber: string
  department: string
}

interface EmployeeResponse {
  employees: Employee[]
  totalPages: number
}

const fetchEmployees = async ({ pageParam = 1, searchTerm = '', filterBy = 'name' }): Promise<EmployeeResponse> => {
  const { data } = await axios.get('https://api.example.com/employees', {
    params: { page: pageParam, search: searchTerm, filterBy }
  })
  return data
}

const logoutUser = async () => {
  await axios.post('https://api.example.com/logout')
}

function EmployeeListContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('name')
  const [page, setPage] = useState(1)
  const router = useRouter()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['employees', page, searchTerm, filterBy],
    queryFn: () => fetchEmployees({ pageParam: page, searchTerm, filterBy }),
  })

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      router.push('/login')
    },
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleSearch = () => {
    setPage(1) // Reset to first page when searching
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
                <summary className="cursor-pointer text-blue-600">Employee manager</summary>
                <ul className="ml-4 mt-2 space-y-1">
                  <li><a href="#" className="text-blue-600">Employee list</a></li>
                </ul>
              </details>
            </li>
            <li><a href="#" className="text-blue-600">Add Employee</a></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Employee list</h2>
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
                placeholder="User Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
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
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date of birth</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Phone number</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.dateOfBirth}</TableCell>
                      <TableCell>{employee.address}</TableCell>
                      <TableCell>{employee.phoneNumber}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <Button variant="link">View</Button>
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
                {[...Array(data?.totalPages || 0)].map((_, index) => (
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
                  disabled={page === data?.totalPages}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

// Create a new QueryClient instance
const queryClient = new QueryClient()

// Wrap the main component with QueryClientProvider
export function EmployeeListComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <EmployeeListContent />
    </QueryClientProvider>
  )
}