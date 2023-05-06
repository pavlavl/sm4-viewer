/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Statuses, { Status } from "../../../statuses/Statuses";
import styles from "./EncryptStatus.module.scss";

function EncryptStatus({ stage }: { stage: number }) {
  const [statusesGenerator, setStatusesGenerator] = useState(
    Statuses.getStatus()
  );
  const [status, setStatus] = useState<IteratorResult<Status, Status>>({
    value: new Status("...", "..."),
  });

  function nextStatus() {
    const data = statusesGenerator.next();
    if (data.value) setStatus(data);
  }

  useEffect(() => {
    setStatusesGenerator(Statuses.getStatus());
  }, [stage]);

  useEffect(() => {
    nextStatus();
  }, [statusesGenerator]);

  return (
    <div className={styles["encrypt-status"]}>
      <div className={styles["encrypt-status__title-block"]}>
        <Typography variant="h6" component="h6" gutterBottom>
          Текущий статус (
          {Statuses.statusesQueue.findIndex(
            (st) =>
              st.status + st.value === status.value.status + status.value.value
          ) + 1}{" "}
          / {Statuses.statusesQueue.length}):
        </Typography>
        <Button size="medium" variant="contained" onClick={() => nextStatus()}>
          Далее
        </Button>
      </div>
      <div className={styles["encrypt-status__block"]}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Статус</TableCell>
                <TableCell>Текущий шифр текст</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {status.value.status}
                </TableCell>
                <TableCell component="th" scope="row">
                  {status.value.value}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default React.memo(EncryptStatus);
