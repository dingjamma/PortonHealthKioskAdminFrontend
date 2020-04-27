import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function AppointmentList() {
  const classes = useStyles();

  const [listAppointent, setListAppointments] = useState([]);

  async function getAppointments() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    myHeaders.append(
      "Cookie",
      "EGG_SESS=DFXZpcM31bRAT37S2_AoV3e_rCJWbmBs42EshRLqz_HO84LJkupAfuZx03L0O3D-x9gHfxn3UplF38lobVXEn9VumLLoF9HFrygwTAWbk5P79ZigWk5ids1pRWM-QQQNvP5mTjYH1DXZ_8sEDDnyiN20qdPp_s51Z9tdU2MVJA0TD4K3ObejENNB9mUWMS6kkWHoxlbZVx57zX2q7crt1FYP3_XuHtrcPRpMtPNGepe_lklxZPZ-KPbxRmuzDDTV2Z1TwIhow48gkCg_tqNTa_RC55qRvtMRnt6GeUgGXU9vl-JflW-nmgNR1yrx_G4euxXwSWpS-K0vTEK_UqXGNgC7XQcPv8yGrjWbgZu9LgD5JiAqOmd4rObTewPMbgwf"
    );
    // var raw = JSON.stringify({
    //   familyName,
    //   givenName,
    //   age,
    //   time:{start,end},
    //   address:{
    //     street,
    //     city,
    //     province,
    //     country,
    //     postcode},
    //   phone,insurance:{
    //     company,
    //     policyNumber},
    //   clinicId,
    //   checkedIn});

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      // body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:7001/public/appointment/find", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const theAppointments = JSON.parse(result);
        console.log("cool variable", theAppointments);
        console.log(typeof theAppointments);
        if (theAppointments.success) {
          setListAppointments(theAppointments.result); //this allows me to not throw an error when running
        }
        console.log(listAppointent);
      })
      .catch((error) => console.log("error", error));

    return (
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size='small'
          aria-label='a dense table'
        >
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align='right'>familyName</TableCell>
              <TableCell align='right'>givenName</TableCell>
              <TableCell align='right'>age</TableCell>
              <TableCell align='right'>phone</TableCell>
              <TableCell align='right'>checkedIn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listAppointent &&
              listAppointent.map((row) => {
                <TableRow key={listAppointent.time}>
                  <TableCell component='th' scope='row'>
                    {listAppointent.time}
                  </TableCell>
                  <TableCell align='right'>
                    {listAppointent.familyName}
                  </TableCell>
                  <TableCell align='right'>
                    {listAppointent.givenName}
                  </TableCell>
                  <TableCell align='right'>{listAppointent.age}</TableCell>
                  <TableCell align='right'>{listAppointent.phone}</TableCell>
                  <TableCell align='right'>
                    {listAppointent.checkedIn}
                  </TableCell>
                </TableRow>;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
