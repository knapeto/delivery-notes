import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CircularProgress } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Title } from "react-admin";
import cookie from "js-cookie";
import styled from "styled-components";
import { url } from "../../";
import { useGetDeliveryNotesLazyQuery } from "../../@generated/hooks";
import { useState } from "react";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DeliveryNotesList = () => {
  const [search, setSearch] = useState("");
  const [loadingIds, setLoadingIds] = useState([]);

  const [getDeliveryNotes, { data }] = useGetDeliveryNotesLazyQuery();

  const onSubmit = async () => {
    getDeliveryNotes({
      variables: {
        search,
      },
    });
  };

  const handleSetLoading = (id) => {
    if (loadingIds.includes(id)) {
      setLoadingIds(loadingIds.filter((item) => item !== id));
    } else {
      setLoadingIds([...loadingIds, id]);
    }

    setTimeout(() => {
      setLoadingIds(loadingIds.filter((item) => item !== id));
    }, 10000);
  };

  return (
    <div>
      <Card style={{ width: "40%" }}>
        <Title title="Delivery note" />
        <CardContent>
          <form onSubmit={onSubmit}>
            <Row>
              <FormControl size="small" style={{ width: "100%" }}>
                <InputLabel>Search</InputLabel>
                <OutlinedInput
                  type="text"
                  size="small"
                  label="Search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </FormControl>

              <Button onClick={onSubmit} style={{ width: 150, marginLeft: 22 }}>
                Search
              </Button>
            </Row>
          </form>
        </CardContent>
      </Card>

      <br />

      <TableContainer component={Paper} style={{ maxHeight: "70vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="right">Klient</TableCell>
              <TableCell align="right">Fakturační místo</TableCell>
              <TableCell align="right">Místo dodání</TableCell>
              <TableCell align="right">Dodací list</TableCell>
              <TableCell align="right">Obj</TableCell>
              <TableCell align="right">Obj zákazníka</TableCell>
              <TableCell align="right">Code</TableCell>
              <TableCell align="right" width="120">
                Akce
              </TableCell>
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
                <TableCell align="right">
                  <div>{row.DodaciMisto_Nazev}</div>
                  <div>{row.DodaciMisto_Mesto}</div>
                  <div>{row.DodaciMisto_Zeme}</div>
                </TableCell>
                <TableCell align="right">{row.CisloDL}</TableCell>
                <TableCell align="right">{row.CisloObjKlienta}</TableCell>
                <TableCell align="right">{row.CisloObjZakaznika}</TableCell>
                <TableCell align="right">{row.Doprava_CODE}</TableCell>
                <TableCell align="right">
                  <a
                    target="_blank"
                    onClick={() =>
                      handleSetLoading(row.InterniCisloDokladuProTisk)
                    }
                    href={`${url}/admin/delivery-note/${
                      row.InterniCisloDokladuProTisk
                    }?access_token=${cookie.get("access_token")}`}
                    download
                    style={{ margin: "0 auto" }}
                  >
                    {loadingIds.includes(row.InterniCisloDokladuProTisk) ? (
                      <CircularProgress
                        style={{ height: 20, width: 20, marginRight: 24 }}
                      />
                    ) : (
                      "Download"
                    )}
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
