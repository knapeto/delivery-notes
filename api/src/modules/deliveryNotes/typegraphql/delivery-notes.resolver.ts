import {
  Args,
  ArgsType,
  Field,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import LfsConnection from '../../core/lfs.database';

@ObjectType()
export class DeliveryNote {
  @Field(() => String, { nullable: true })
  Sklad?: string;

  @Field(() => String, { nullable: true })
  Klient?: string;

  @Field(() => String, { nullable: true })
  KlientNazev?: string;

  @Field(() => String, { nullable: true })
  FakturacniMistoNazev?: string;

  @Field(() => String, { nullable: true })
  DodaciMisto_Kod?: string;

  @Field(() => String, { nullable: true })
  DodaciMisto_Nazev?: string;

  @Field(() => String, { nullable: true })
  DodaciMisto_Ulice?: string;

  @Field(() => String, { nullable: true })
  DodaciMisto_PSC?: string;

  @Field(() => String, { nullable: true })
  DodaciMisto_Mesto?: string;

  @Field(() => String, { nullable: true })
  DodaciMisto_Zeme?: string;

  @Field(() => String, { nullable: true })
  CisloDL?: string;

  @Field(() => String, { nullable: true })
  CisloObjKlienta?: string;

  @Field(() => String, { nullable: true })
  CisloObjZakaznika?: string;

  @Field(() => String, { nullable: true })
  InterniCisloDokladuProTisk?: string;

  @Field(() => String, { nullable: true })
  DatumDodani?: string;

  @Field(() => String, { nullable: true })
  Doprava_Linka?: string;

  @Field(() => String, { nullable: true })
  Doprava_CODE?: string;
}

@ArgsType()
export class DeliveryNoteSearch {
  @Field(() => String, { nullable: true })
  search?: string;
}

@Resolver(() => DeliveryNote)
export class DeliveryNotesResolver {
  @Query(() => [DeliveryNote])
  async getDeliveryNotes(
    @Args() args: DeliveryNoteSearch,
  ): Promise<DeliveryNote[]> {
    const connection = await LfsConnection;
    const result: any = await connection.query(
      `
      select
        VPP.AKKONZ as "Sklad"
        ,VPP.AKFIRM as "Klient"
        ,trim(Kli.FSAN1) as "KlientNazev"
        ,case when VPP.AKBAN1 is null or trim(VPP.AKBAN1) = '' then trim(VPP.AKAN1) else trim(VPP.AKBAN1) end as "FakturacniMistoNazev"
        ,trim(VPP.AKKDNR) as "DodaciMisto_Kod"
        ,trim(VPP.AKAN1) as "DodaciMisto_Nazev"
        ,trim(VPP.AKSTR) as "DodaciMisto_Ulice"
        ,trim(VPP.AKPLZ) as "DodaciMisto_PSC"
        ,trim(VPP.AKLORT) as "DodaciMisto_Mesto"
        ,trim(VPP.AKLAKZ) as DodaciMisto_Zeme
        ,trim(VPP.AKLSNR) as "CisloDL"
        ,trim(VPP.AKANR1) as "CisloObjKlienta"
        ,trim(VPP.AKKREF) as "CisloObjZakaznika"
        ,VPP.AKAPN as "InterniCisloDokladuProTisk"
        ,SUBSTRING(VPP.AKDTB,7,2) || '.' || SUBSTRING(VPP.AKDTB,5,2) || '.' || SUBSTRING(VPP.AKDTB,1,4) as "DatumDodani"
        ,trim(VPP.akrfnr) as "Doprava_Linka"
        ,trim(VPP.AKVTLN) as "Doprava_CODE"
    from
            -- tabulka vyřízených pracovních paketů
        elgdatv8.psaveak VPP
            -- klient - základní údaje
        left join elgdatv8.pfistam Kli on Kli.FSKONZ = VPP.AKKONZ
                                        and Kli.FSFIRM = VPP.AKFIRM
            -- dodací místo
        left join elgdatv8.pkunden ZD on ZD.KDKDNR = VPP.AKKDNR
                                        and ZD.KDKDLI = 1
                                        and ZD.KDKONZ = VPP.AKKONZ
                                        and ZD.KDFIRM = VPP.AKFIRM
            -- fakturační místo
        left join elgdatv8.pkunden ZF on ZF.KDKDNR = VPP.AKBKDN
                                        and ZF.KDKDLI = 1
                                        and ZF.KDKONZ = VPP.AKKONZ
                                        and ZF.KDFIRM = VPP.AKFIRM
    where
        VPP.AKLSNR like '%' || ${args.search} || '%' -- číslo DL
        or VPP.AKANR1 like '%' || ${args.search} || '%' -- číslo objednávky klienta
        or VPP.AKKREF like '%' || ${args.search} || '%' -- číslo objednávky zákazníka (odběratele))
    order by
        VPP.AKDTB desc
    `,
    );

    console.log(result);

    return result;
  }
}
