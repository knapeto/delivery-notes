import * as Types from "./schemas";

export type TestMutationMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type TestMutationMutation = { __typename?: "Mutation" } & Pick<
  Types.Mutation,
  "testMutation"
>;

export type GetDeliveryNotesQueryVariables = Types.Exact<{
  search: Types.Scalars["String"];
}>;

export type GetDeliveryNotesQuery = { __typename?: "Query" } & {
  getDeliveryNotes: Array<
    { __typename?: "DeliveryNote" } & Pick<
      Types.DeliveryNote,
      | "Sklad"
      | "Klient"
      | "KlientNazev"
      | "FakturacniMistoNazev"
      | "DodaciMisto_Kod"
      | "DodaciMisto_Nazev"
      | "DodaciMisto_Ulice"
      | "DodaciMisto_PSC"
      | "DodaciMisto_Mesto"
      | "DodaciMisto_Zeme"
      | "CisloDL"
      | "CisloObjKlienta"
      | "CisloObjZakaznika"
      | "InterniCisloDokladuProTisk"
      | "DatumDodani"
      | "Doprava_Linka"
      | "Doprava_CODE"
    >
  >;
};
