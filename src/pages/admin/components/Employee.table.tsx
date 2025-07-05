import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EmployeeInterface } from "../../../interfaces/employee.interface";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

interface EmployeesTableProps {
  employees: EmployeeInterface[];
}
const EmployeesTable: React.FC<EmployeesTableProps> = ({ employees }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} className="rounded shadow">
      <Table className="min-w-full table-auto">
        <TableHead>
          <TableRow className="bg-gray-100">
            <TableCell className="font-semibold">No</TableCell>
            <TableCell className="font-semibold">Full Name</TableCell>
            <TableCell className="font-semibold">Position</TableCell>
            <TableCell className="font-semibold">Office</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow
              key={employee.id}
              className={`hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <TableCell className="py-2">{employee.id}</TableCell>
              <TableCell
                className="py-2 text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate(`/employee/${employee.id}`)}
              >
                {employee.english_name}
              </TableCell>
              <TableCell className="py-2">
                {employee.english_position}
              </TableCell>
              <TableCell className="py-2">{employee.office}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeesTable;
