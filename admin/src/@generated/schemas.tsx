export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AffectedRowsOutput = {
  __typename?: "AffectedRowsOutput";
  count: Scalars["Int"];
};

export type AggregateUser = {
  __typename?: "AggregateUser";
  _count?: Maybe<UserCountAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _max?: Maybe<UserMaxAggregate>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: Maybe<Scalars["Boolean"]>;
};

export type BoolFilter = {
  equals?: Maybe<Scalars["Boolean"]>;
  not?: Maybe<NestedBoolFilter>;
};

export type BoolNullableFilter = {
  equals?: Maybe<Scalars["Boolean"]>;
  not?: Maybe<NestedBoolNullableFilter>;
};

export type BoolNullableWithAggregatesFilter = {
  equals?: Maybe<Scalars["Boolean"]>;
  not?: Maybe<NestedBoolNullableWithAggregatesFilter>;
  _count?: Maybe<NestedIntNullableFilter>;
  _min?: Maybe<NestedBoolNullableFilter>;
  _max?: Maybe<NestedBoolNullableFilter>;
};

export type BoolWithAggregatesFilter = {
  equals?: Maybe<Scalars["Boolean"]>;
  not?: Maybe<NestedBoolWithAggregatesFilter>;
  _count?: Maybe<NestedIntFilter>;
  _min?: Maybe<NestedBoolFilter>;
  _max?: Maybe<NestedBoolFilter>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars["DateTime"]>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  notIn?: Maybe<Array<Scalars["DateTime"]>>;
  lt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  gt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type DateTimeNullableFilter = {
  equals?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  notIn?: Maybe<Array<Scalars["DateTime"]>>;
  lt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  gt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  not?: Maybe<NestedDateTimeNullableFilter>;
};

export type DateTimeNullableWithAggregatesFilter = {
  equals?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  notIn?: Maybe<Array<Scalars["DateTime"]>>;
  lt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  gt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  not?: Maybe<NestedDateTimeNullableWithAggregatesFilter>;
  _count?: Maybe<NestedIntNullableFilter>;
  _min?: Maybe<NestedDateTimeNullableFilter>;
  _max?: Maybe<NestedDateTimeNullableFilter>;
};

export type DateTimeWithAggregatesFilter = {
  equals?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  notIn?: Maybe<Array<Scalars["DateTime"]>>;
  lt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  gt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  not?: Maybe<NestedDateTimeWithAggregatesFilter>;
  _count?: Maybe<NestedIntFilter>;
  _min?: Maybe<NestedDateTimeFilter>;
  _max?: Maybe<NestedDateTimeFilter>;
};

export type DeliveryNote = {
  __typename?: "DeliveryNote";
  Sklad: Scalars["String"];
  Klient: Scalars["String"];
  KlientNazev: Scalars["String"];
  FakturacniMistoNazev: Scalars["String"];
  DodaciMisto_Kod: Scalars["String"];
  DodaciMisto_Nazev: Scalars["String"];
  DodaciMisto_Ulice: Scalars["String"];
  DodaciMisto_PSC: Scalars["String"];
  DodaciMisto_Mesto: Scalars["String"];
  DodaciMisto_Zeme: Scalars["String"];
  CisloDL: Scalars["String"];
  CisloObjKlienta: Scalars["String"];
  CisloObjZakaznika: Scalars["String"];
  InterniCisloDokladuProTisk: Scalars["String"];
  DatumDodani: Scalars["String"];
  Doprava_Linka: Scalars["String"];
  Doprava_CODE: Scalars["String"];
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  user: User;
  access_token: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: User;
  createManyUser: AffectedRowsOutput;
  deleteUser?: Maybe<User>;
  updateUser: User;
  deleteManyUser: AffectedRowsOutput;
  updateManyUser: AffectedRowsOutput;
  upsertUser: User;
  login: LoginResponse;
  testMutation: Scalars["Boolean"];
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type MutationCreateManyUserArgs = {
  data: Array<UserCreateManyInput>;
  skipDuplicates?: Maybe<Scalars["Boolean"]>;
};

export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};

export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type MutationDeleteManyUserArgs = {
  where?: Maybe<UserWhereInput>;
};

export type MutationUpdateManyUserArgs = {
  data: UserUpdateManyMutationInput;
  where?: Maybe<UserWhereInput>;
};

export type MutationUpsertUserArgs = {
  where: UserWhereUniqueInput;
  create: UserCreateInput;
  update: UserUpdateInput;
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type NestedBoolFilter = {
  equals?: Maybe<Scalars["Boolean"]>;
  not?: Maybe<NestedBoolFilter>;
};

export type NestedBoolNullableFilter = {
  equals?: Maybe<Scalars["Boolean"]>;
  not?: Maybe<NestedBoolNullableFilter>;
};

export type NestedBoolNullableWithAggregatesFilter = {
  equals?: Maybe<Scalars["Boolean"]>;
  not?: Maybe<NestedBoolNullableWithAggregatesFilter>;
  _count?: Maybe<NestedIntNullableFilter>;
  _min?: Maybe<NestedBoolNullableFilter>;
  _max?: Maybe<NestedBoolNullableFilter>;
};

export type NestedBoolWithAggregatesFilter = {
  equals?: Maybe<Scalars["Boolean"]>;
  not?: Maybe<NestedBoolWithAggregatesFilter>;
  _count?: Maybe<NestedIntFilter>;
  _min?: Maybe<NestedBoolFilter>;
  _max?: Maybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  notIn?: Maybe<Array<Scalars["DateTime"]>>;
  lt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  gt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type NestedDateTimeNullableFilter = {
  equals?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  notIn?: Maybe<Array<Scalars["DateTime"]>>;
  lt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  gt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  not?: Maybe<NestedDateTimeNullableFilter>;
};

export type NestedDateTimeNullableWithAggregatesFilter = {
  equals?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  notIn?: Maybe<Array<Scalars["DateTime"]>>;
  lt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  gt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  not?: Maybe<NestedDateTimeNullableWithAggregatesFilter>;
  _count?: Maybe<NestedIntNullableFilter>;
  _min?: Maybe<NestedDateTimeNullableFilter>;
  _max?: Maybe<NestedDateTimeNullableFilter>;
};

export type NestedDateTimeWithAggregatesFilter = {
  equals?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  notIn?: Maybe<Array<Scalars["DateTime"]>>;
  lt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  gt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  not?: Maybe<NestedDateTimeWithAggregatesFilter>;
  _count?: Maybe<NestedIntFilter>;
  _min?: Maybe<NestedDateTimeFilter>;
  _max?: Maybe<NestedDateTimeFilter>;
};

export type NestedIntFilter = {
  equals?: Maybe<Scalars["Int"]>;
  in?: Maybe<Array<Scalars["Int"]>>;
  notIn?: Maybe<Array<Scalars["Int"]>>;
  lt?: Maybe<Scalars["Int"]>;
  lte?: Maybe<Scalars["Int"]>;
  gt?: Maybe<Scalars["Int"]>;
  gte?: Maybe<Scalars["Int"]>;
  not?: Maybe<NestedIntFilter>;
};

export type NestedIntNullableFilter = {
  equals?: Maybe<Scalars["Int"]>;
  in?: Maybe<Array<Scalars["Int"]>>;
  notIn?: Maybe<Array<Scalars["Int"]>>;
  lt?: Maybe<Scalars["Int"]>;
  lte?: Maybe<Scalars["Int"]>;
  gt?: Maybe<Scalars["Int"]>;
  gte?: Maybe<Scalars["Int"]>;
  not?: Maybe<NestedIntNullableFilter>;
};

export type NestedStringFilter = {
  equals?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  notIn?: Maybe<Array<Scalars["String"]>>;
  lt?: Maybe<Scalars["String"]>;
  lte?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  gte?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  startsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  not?: Maybe<NestedStringFilter>;
};

export type NestedStringNullableFilter = {
  equals?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  notIn?: Maybe<Array<Scalars["String"]>>;
  lt?: Maybe<Scalars["String"]>;
  lte?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  gte?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  startsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type NestedStringNullableWithAggregatesFilter = {
  equals?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  notIn?: Maybe<Array<Scalars["String"]>>;
  lt?: Maybe<Scalars["String"]>;
  lte?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  gte?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  startsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  not?: Maybe<NestedStringNullableWithAggregatesFilter>;
  _count?: Maybe<NestedIntNullableFilter>;
  _min?: Maybe<NestedStringNullableFilter>;
  _max?: Maybe<NestedStringNullableFilter>;
};

export type NestedStringWithAggregatesFilter = {
  equals?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  notIn?: Maybe<Array<Scalars["String"]>>;
  lt?: Maybe<Scalars["String"]>;
  lte?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  gte?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  startsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  not?: Maybe<NestedStringWithAggregatesFilter>;
  _count?: Maybe<NestedIntFilter>;
  _min?: Maybe<NestedStringFilter>;
  _max?: Maybe<NestedStringFilter>;
};

export type NullableBoolFieldUpdateOperationsInput = {
  set?: Maybe<Scalars["Boolean"]>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars["DateTime"]>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  findFirstUser?: Maybe<User>;
  users: Array<User>;
  aggregateUser: AggregateUser;
  groupByUser: Array<UserGroupBy>;
  getDeliveryNotes: Array<DeliveryNote>;
  testQuery: Scalars["Boolean"];
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryFindFirstUserArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByWithRelationInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  distinct?: Maybe<Array<UserScalarFieldEnum>>;
};

export type QueryUsersArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByWithRelationInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  distinct?: Maybe<Array<UserScalarFieldEnum>>;
};

export type QueryAggregateUserArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByWithRelationInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
};

export type QueryGroupByUserArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByWithAggregationInput>>;
  by: Array<UserScalarFieldEnum>;
  having?: Maybe<UserScalarWhereWithAggregatesInput>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
};

export type QueryGetDeliveryNotesArgs = {
  search: Scalars["String"];
};

export enum QueryMode {
  Default = "default",
  Insensitive = "insensitive",
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars["String"]>;
};

export type StringFilter = {
  equals?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  notIn?: Maybe<Array<Scalars["String"]>>;
  lt?: Maybe<Scalars["String"]>;
  lte?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  gte?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  startsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringFilter>;
};

export type StringNullableFilter = {
  equals?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  notIn?: Maybe<Array<Scalars["String"]>>;
  lt?: Maybe<Scalars["String"]>;
  lte?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  gte?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  startsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type StringNullableWithAggregatesFilter = {
  equals?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  notIn?: Maybe<Array<Scalars["String"]>>;
  lt?: Maybe<Scalars["String"]>;
  lte?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  gte?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  startsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringNullableWithAggregatesFilter>;
  _count?: Maybe<NestedIntNullableFilter>;
  _min?: Maybe<NestedStringNullableFilter>;
  _max?: Maybe<NestedStringNullableFilter>;
};

export type StringWithAggregatesFilter = {
  equals?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  notIn?: Maybe<Array<Scalars["String"]>>;
  lt?: Maybe<Scalars["String"]>;
  lte?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  gte?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  startsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringWithAggregatesFilter>;
  _count?: Maybe<NestedIntFilter>;
  _min?: Maybe<NestedStringFilter>;
  _max?: Maybe<NestedStringFilter>;
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  createdAt: Scalars["DateTime"];
  isAd: Scalars["Boolean"];
  presetPassword?: Maybe<Scalars["Boolean"]>;
  deletedAt?: Maybe<Scalars["DateTime"]>;
  isAdmin: Scalars["Boolean"];
};

export type UserCountAggregate = {
  __typename?: "UserCountAggregate";
  id: Scalars["Int"];
  password: Scalars["Int"];
  tokenSalt: Scalars["Int"];
  firstName: Scalars["Int"];
  lastName: Scalars["Int"];
  email: Scalars["Int"];
  createdAt: Scalars["Int"];
  isAd: Scalars["Int"];
  presetPassword: Scalars["Int"];
  deletedAt: Scalars["Int"];
  isAdmin: Scalars["Int"];
  _all: Scalars["Int"];
};

export type UserCountOrderByAggregateInput = {
  id?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  tokenSalt?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  isAd?: Maybe<SortOrder>;
  presetPassword?: Maybe<SortOrder>;
  deletedAt?: Maybe<SortOrder>;
  isAdmin?: Maybe<SortOrder>;
};

export type UserCreateInput = {
  id?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  tokenSalt?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  isAd: Scalars["Boolean"];
  presetPassword?: Maybe<Scalars["Boolean"]>;
  deletedAt?: Maybe<Scalars["DateTime"]>;
  isAdmin?: Maybe<Scalars["Boolean"]>;
};

export type UserCreateManyInput = {
  id?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  tokenSalt?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  isAd: Scalars["Boolean"];
  presetPassword?: Maybe<Scalars["Boolean"]>;
  deletedAt?: Maybe<Scalars["DateTime"]>;
  isAdmin?: Maybe<Scalars["Boolean"]>;
};

export type UserGroupBy = {
  __typename?: "UserGroupBy";
  id: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
  tokenSalt: Scalars["String"];
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  createdAt: Scalars["DateTime"];
  isAd: Scalars["Boolean"];
  presetPassword?: Maybe<Scalars["Boolean"]>;
  deletedAt?: Maybe<Scalars["DateTime"]>;
  isAdmin: Scalars["Boolean"];
  _count?: Maybe<UserCountAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _max?: Maybe<UserMaxAggregate>;
};

export type UserMaxAggregate = {
  __typename?: "UserMaxAggregate";
  id?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  tokenSalt?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  isAd?: Maybe<Scalars["Boolean"]>;
  presetPassword?: Maybe<Scalars["Boolean"]>;
  deletedAt?: Maybe<Scalars["DateTime"]>;
  isAdmin?: Maybe<Scalars["Boolean"]>;
};

export type UserMaxOrderByAggregateInput = {
  id?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  tokenSalt?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  isAd?: Maybe<SortOrder>;
  presetPassword?: Maybe<SortOrder>;
  deletedAt?: Maybe<SortOrder>;
  isAdmin?: Maybe<SortOrder>;
};

export type UserMinAggregate = {
  __typename?: "UserMinAggregate";
  id?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  tokenSalt?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  isAd?: Maybe<Scalars["Boolean"]>;
  presetPassword?: Maybe<Scalars["Boolean"]>;
  deletedAt?: Maybe<Scalars["DateTime"]>;
  isAdmin?: Maybe<Scalars["Boolean"]>;
};

export type UserMinOrderByAggregateInput = {
  id?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  tokenSalt?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  isAd?: Maybe<SortOrder>;
  presetPassword?: Maybe<SortOrder>;
  deletedAt?: Maybe<SortOrder>;
  isAdmin?: Maybe<SortOrder>;
};

export type UserOrderByWithAggregationInput = {
  id?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  tokenSalt?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  isAd?: Maybe<SortOrder>;
  presetPassword?: Maybe<SortOrder>;
  deletedAt?: Maybe<SortOrder>;
  isAdmin?: Maybe<SortOrder>;
  _count?: Maybe<UserCountOrderByAggregateInput>;
  _max?: Maybe<UserMaxOrderByAggregateInput>;
  _min?: Maybe<UserMinOrderByAggregateInput>;
};

export type UserOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  tokenSalt?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  isAd?: Maybe<SortOrder>;
  presetPassword?: Maybe<SortOrder>;
  deletedAt?: Maybe<SortOrder>;
  isAdmin?: Maybe<SortOrder>;
};

export enum UserScalarFieldEnum {
  Id = "id",
  Password = "password",
  TokenSalt = "tokenSalt",
  FirstName = "firstName",
  LastName = "lastName",
  Email = "email",
  CreatedAt = "createdAt",
  IsAd = "isAd",
  PresetPassword = "presetPassword",
  DeletedAt = "deletedAt",
  IsAdmin = "isAdmin",
}

export type UserScalarWhereWithAggregatesInput = {
  AND?: Maybe<Array<UserScalarWhereWithAggregatesInput>>;
  OR?: Maybe<Array<UserScalarWhereWithAggregatesInput>>;
  NOT?: Maybe<Array<UserScalarWhereWithAggregatesInput>>;
  id?: Maybe<StringWithAggregatesFilter>;
  password?: Maybe<StringNullableWithAggregatesFilter>;
  tokenSalt?: Maybe<StringWithAggregatesFilter>;
  firstName?: Maybe<StringNullableWithAggregatesFilter>;
  lastName?: Maybe<StringNullableWithAggregatesFilter>;
  email?: Maybe<StringWithAggregatesFilter>;
  createdAt?: Maybe<DateTimeWithAggregatesFilter>;
  isAd?: Maybe<BoolWithAggregatesFilter>;
  presetPassword?: Maybe<BoolNullableWithAggregatesFilter>;
  deletedAt?: Maybe<DateTimeNullableWithAggregatesFilter>;
  isAdmin?: Maybe<BoolWithAggregatesFilter>;
};

export type UserUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  tokenSalt?: Maybe<StringFieldUpdateOperationsInput>;
  firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  isAd?: Maybe<BoolFieldUpdateOperationsInput>;
  presetPassword?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  deletedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  isAdmin?: Maybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  tokenSalt?: Maybe<StringFieldUpdateOperationsInput>;
  firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  isAd?: Maybe<BoolFieldUpdateOperationsInput>;
  presetPassword?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  deletedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  isAdmin?: Maybe<BoolFieldUpdateOperationsInput>;
};

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  id?: Maybe<StringFilter>;
  password?: Maybe<StringNullableFilter>;
  tokenSalt?: Maybe<StringFilter>;
  firstName?: Maybe<StringNullableFilter>;
  lastName?: Maybe<StringNullableFilter>;
  email?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  isAd?: Maybe<BoolFilter>;
  presetPassword?: Maybe<BoolNullableFilter>;
  deletedAt?: Maybe<DateTimeNullableFilter>;
  isAdmin?: Maybe<BoolFilter>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars["String"]>;
};
