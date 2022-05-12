import * as Types from "./operations";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};

export const TestMutationDocument = gql`
  mutation testMutation {
    testMutation
  }
`;
export type TestMutationMutationFn = Apollo.MutationFunction<
  Types.TestMutationMutation,
  Types.TestMutationMutationVariables
>;

/**
 * __useTestMutationMutation__
 *
 * To run a mutation, you first call `useTestMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testMutationMutation, { data, loading, error }] = useTestMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function useTestMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.TestMutationMutation,
    Types.TestMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.TestMutationMutation,
    Types.TestMutationMutationVariables
  >(TestMutationDocument, options);
}
export type TestMutationMutationHookResult = ReturnType<
  typeof useTestMutationMutation
>;
export type TestMutationMutationResult =
  Apollo.MutationResult<Types.TestMutationMutation>;
export type TestMutationMutationOptions = Apollo.BaseMutationOptions<
  Types.TestMutationMutation,
  Types.TestMutationMutationVariables
>;
export const GetDeliveryNotesDocument = gql`
  query getDeliveryNotes($search: String!) {
    getDeliveryNotes(search: $search) {
      Sklad
      Klient
      KlientNazev
      FakturacniMistoNazev
      DodaciMisto_Kod
      DodaciMisto_Nazev
      DodaciMisto_Ulice
      DodaciMisto_PSC
      DodaciMisto_Mesto
      DodaciMisto_Zeme
      CisloDL
      CisloObjKlienta
      CisloObjZakaznika
      InterniCisloDokladuProTisk
      DatumDodani
      Doprava_Linka
      Doprava_CODE
    }
  }
`;

/**
 * __useGetDeliveryNotesQuery__
 *
 * To run a query within a React component, call `useGetDeliveryNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeliveryNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeliveryNotesQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetDeliveryNotesQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetDeliveryNotesQuery,
    Types.GetDeliveryNotesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.GetDeliveryNotesQuery,
    Types.GetDeliveryNotesQueryVariables
  >(GetDeliveryNotesDocument, options);
}
export function useGetDeliveryNotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetDeliveryNotesQuery,
    Types.GetDeliveryNotesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetDeliveryNotesQuery,
    Types.GetDeliveryNotesQueryVariables
  >(GetDeliveryNotesDocument, options);
}
export type GetDeliveryNotesQueryHookResult = ReturnType<
  typeof useGetDeliveryNotesQuery
>;
export type GetDeliveryNotesLazyQueryHookResult = ReturnType<
  typeof useGetDeliveryNotesLazyQuery
>;
export type GetDeliveryNotesQueryResult = Apollo.QueryResult<
  Types.GetDeliveryNotesQuery,
  Types.GetDeliveryNotesQueryVariables
>;
