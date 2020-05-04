import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { format } from "date-fns";
import { differenceInYears } from "date-fns";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function AppointmentList() {
  const classes = useStyles();

  const [listAppointment, setListAppointments] = useState([]);

  async function getAppointments() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    console.log("REQUEST:", requestOptions);
    fetch("http://localhost:7001/public/appointment/find", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const theAppointments = JSON.parse(result);
        console.log("the appointments", theAppointments);
        console.log(typeof theAppointments);

        if (theAppointments.success) {
          setListAppointments(theAppointments.result); //this allows me to not throw an error when running
          console.log(JSON.stringify(listAppointment));
        }
      })
      .catch((error) => console.log("error", error));
  }
  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Start Time</TableCell>
            <TableCell align='right'>End Time</TableCell>
            <TableCell align='right'>Family Name</TableCell>
            <TableCell align='right'>Given Name</TableCell>
            <TableCell align='right'>Age</TableCell>
            <TableCell align='right'>Phone</TableCell>
            <TableCell align='right'>Checked-In</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listAppointment &&
            listAppointment.map((row) => {
              return (
                //this return in necessary  TO ADD INFORMATION IN A CHILD JSON, DO ROW."OBJECT"."CHILDOBJECT"
                <TableRow key={row._id}>
                  <TableCell component='th' scope='row'>
                    {format(new Date(row.time.start), "p")}
                  </TableCell>
                  <TableCell align='right'>
                    {format(new Date(row.time.end), "p")}
                  </TableCell>
                  <TableCell align='right'>
                    {row.patientId.familyName}
                  </TableCell>
                  <TableCell align='right'>{row.patientId.givenName}</TableCell>
                  <TableCell align='right'>
                    {differenceInYears(
                      new Date(),
                      new Date(row.patientId.birthday)
                    )}
                  </TableCell>
                  <TableCell align='right'>{row.patientId.phone}</TableCell>
                  <TableCell align='right'>
                    {row.checkedIn ? "Checked-In" : "Not Checked-In"}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
