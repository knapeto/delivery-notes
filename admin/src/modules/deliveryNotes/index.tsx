import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Title } from "react-admin";
import cookie from "js-cookie";
import { url } from "../../";
import { useGetDeliveryNotesLazyQuery } from "../../@generated/hooks";
import { useState } from "react";

export const DeliveryNotesList = () => {
  const [search, setSearch] = useState("5006905"); // 5006905

  const [getDeliveryNotes, { data }] = useGetDeliveryNotesLazyQuery();

  const onSubmit = async () => {
    getDeliveryNotes({
      variables: {
        search,
      },
    });
  };

  return (
    <div>
      <Card style={{ width: 400, marginLeft: "30%" }}>
        <Title title="Delivery note" />
        <CardContent>
          <form onSubmit={onSubmit}>
            <FormControl size="small" style={{ marginTop: 20, width: "100%" }}>
              <InputLabel>Search</InputLabel>
              <OutlinedInput
                type="text"
                size="small"
                label="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </FormControl>

            <br />

            <Button onClick={onSubmit} style={{ width: "100%" }}>
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      <br />

      <TableContainer component={Paper} style={{ maxHeight: "70vh" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Klient</TableCell>
              <TableCell align="right">Fakturační místo</TableCell>
              <TableCell align="right">Adresa dodání</TableCell>
              <TableCell align="right">Město dodání</TableCell>
              <TableCell align="right">Země dodání</TableCell>
              <TableCell align="right">Číslo DL</TableCell>
              <TableCell align="right">Objednávka</TableCell>
              <TableCell align="right">Objednávka zákazníka</TableCell>
              <TableCell align="right">Code</TableCell>
              <TableCell align="right">Akce</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data?.getDeliveryNotes || []).map((row, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.KlientNazev}</TableCell>
                <TableCell align="right">{row.FakturacniMistoNazev}</TableCell>
                <TableCell align="right">{row.DodaciMisto_Nazev}</TableCell>
                <TableCell align="right">{row.DodaciMisto_Mesto}</TableCell>
                <TableCell align="right">{row.DodaciMisto_Zeme}</TableCell>
                <TableCell align="right">{row.CisloDL}</TableCell>
                <TableCell align="right">{row.CisloObjKlienta}</TableCell>
                <TableCell align="right">{row.CisloObjZakaznika}</TableCell>
                <TableCell align="right">{row.Doprava_CODE}</TableCell>
                <TableCell align="right">
                  <a
                    target="_blank"
                    href={`${url}/admin/delivery-note/${
                      row.CisloDL
                    }?access_token=${cookie.get("access_token")}`}
                    download
                    style={{ margin: "0 auto" }}
                  >
                    Download
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
