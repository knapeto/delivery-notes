import {
  Args,
  ArgsType,
  Field,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import LfsConnection from '../../core/lfs.database';
import IngresConnection from '../../core/ingres.database';

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
    const lfsConnection = await LfsConnection;
    const ingresConnection = await IngresConnection;
    const lfsResult: any = await lfsConnection.query(
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

    const ingresResult: any = await ingresConnection.query(
      `
      select
        lo.cislo_skladu as Sklad
        ,lo.cislo_majitele as Klient
        ,trim(Kli.firma_partnera) as KlientNazev
        ,kmf.nazev as FakturacniMistoNazev
        ,trim(km.kod_mista) as DodaciMisto_Kod
        ,trim(km.nazev) as DodaciMisto_Nazev
        ,trim(km.ulice) as DodaciMisto_Ulice
        ,trim(km.psc) as DodaciMisto_PSC
        ,trim(km.obec) as DodaciMisto_Mesto
        ,trim(km.kod_statu) as DodaciMisto_Zeme
        ,trim(ld.sd) as CisloDL
        ,trim(lo.cislo_obj_majitele) as CisloObjKlienta
        ,trim(lo.cislo_obj_odberatele) as CisloObjZakaznika
        ,ld.sd as InterniCisloDokladuProTisk
        ,lo.datum_dodani as DatumDodani
        ,cd.nazev_linky as Doprava_Linka
        ,cd.code as Doprava_CODE
    from
        lst_lo lo
        join lst_ld ld on lo.sd=ld.sd_lo and lo.datum > date('now') - date('1 month')
        join lst_code cd on cd.sd_ld=ld.sd
            -- klient - základní údaje
        join obchodni_partner Kli on Kli.cislo_partnera = lo.cislo_majitele
            -- dodací místo
        join lsc_koncova_mista km on km.id = lo.id_mista and km.cislo_majitele = lo.cislo_majitele
        join lsc_koncova_mista kmf on kmf.id = lo.id_mista_fakt and kmf.cislo_majitele = lo.cislo_majitele
    where
          ld.sd like '%' || ${args.search}  || '%' -- číslo DL
        or lo.cislo_obj_majitele like '%' || ${args.search} || '%' -- číslo objednávky klienta
        or lo.cislo_obj_odberatele like '%' || ${args.search} || '%' -- číslo objednávky zákazníka (odběratele))
    order by
        lo.datum_dodani desc
    `,
    );

    return [
      ...lfsResult.map((item) => ({ ...item, type: 'lfs' })),
      ...ingresResult.map((item) => ({ ...item, type: 'ingres' })),
    ];
  }
}
