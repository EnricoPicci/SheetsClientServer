export enum SheetSortCriteriaEnum {
    OneMonthReturn = <any>"Ritorno Ultimo Mese",
    OneYearReturn = <any>"Ritorno Ultimo Anno",
    DailyChange = <any>"Variazione giornaliera",
    Name = <any>"Nome"
}

export class SheetSortCriteria {
    public static criteria = [
        {id: SheetSortCriteriaEnum.OneMonthReturn, value: 'Ritorno Ultimo Mese'},
        {id: SheetSortCriteriaEnum.OneYearReturn, value: 'Ritorno Ultimo Anno'},
        {id: SheetSortCriteriaEnum.DailyChange, value: 'Variazione giornaliera'},
        {id: SheetSortCriteriaEnum.Name, value: 'Nome'}
    ]
}

