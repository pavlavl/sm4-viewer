import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import JSSM4 from "../../sm4";
import styles from "./Home.module.scss";
import EncryptStatus from "./EncryptStatus/EncryptStatus";
import Statuses from "../../statuses/Statuses";

function Home() {
  const [sm4Key, setSm4Key] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [result, setResult] = useState<string>("...");
  const [sm4, setSm4] = useState(new JSSM4(sm4Key));
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    setSm4(new JSSM4(sm4Key));
  }, [sm4Key]);

  function encrypt(data: string) {
    const s: string = sm4.encryptData_ECB(data);
    setStage((val) => val + 1);
    return s;
  }

  function decrypt(data: string) {
    const s: string = sm4.decryptData_ECB(data);
    setStage((val) => val + 1);
    return s;
  }

  function onEncrypt() {
    Statuses.clearStatusesQueue();
    const resultString: string = encrypt(message);
    setResult(resultString);
  }

  function onDecrypt() {
    Statuses.clearStatusesQueue();
    const resultString: string = decrypt(result);
    setResult(resultString);
  }

  function onMessageChange(val) {
    setMessage(val.target.value);
  }

  return (
    <div className={styles.home} style={{ display: "flex" }}>
      <Card sx={{ maxWidth: 400 }} className={styles.home__card}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Курсовой зинис
          </Typography>
          <Typography variant="h4" component="div" gutterBottom>
            Реализация SM4
          </Typography>
          <TextField
            id="outlined-basic"
            label="Ключ шифрования"
            variant="outlined"
            style={{ marginBottom: "10px" }}
            onChange={(e) => setSm4Key(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Сообщение"
            variant="outlined"
            onChange={(e) => onMessageChange(e)}
          />
        </CardContent>
        <CardActions>
          <Button size="medium" variant="contained" onClick={() => onEncrypt()}>
            Зашифровать
          </Button>
          <Button size="medium" variant="contained" onClick={() => onDecrypt()}>
            Расшифровать
          </Button>
        </CardActions>
      </Card>
      <Card className={styles.home__card}>
        <CardContent>
          <EncryptStatus stage={stage} />
        </CardContent>
        <CardContent>
          <Typography variant="h6" component="h6" gutterBottom>
            Результат:
          </Typography>
          <p className={styles.home__result}>{result}</p>
        </CardContent>
      </Card>
    </div>
  );
}
export default Home;
