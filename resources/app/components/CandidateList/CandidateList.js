import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const columns = [
  { field: 'name', headerName: 'Nome' },
  {
    field: 'city',
    headerName: 'Cidade'
  },
  {
    field: 'experience',
    headerName: 'Experiência'
  },
  {
    field: 'languages',
    headerName: 'Tecnologias'
  }
]

const CandidateList = ({ list }) => {
  const rows = list.map(
    ({ id, name, city, start_experience, end_experience, technologies }) => {
      const experience = end_experience
        ? `${start_experience} - ${end_experience} anos`
        : `${start_experience}+`
      const languages = technologies.map(({ name }) => name).join(',')
      return { id, name, city, experience, languages }
    }
  )
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(({ field, headerName }) => (
              <TableCell align="left" key={field}>
                {headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.city}</TableCell>
              <TableCell align="left">{row.experience}</TableCell>
              <TableCell align="left">{row.languages}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CandidateList
