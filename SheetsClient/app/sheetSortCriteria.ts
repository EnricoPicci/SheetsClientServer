export enum SheetSortCriteriaEnum {
    OneMonthReturn = <any>"Last Month Return",
    OneYearReturn = <any>"Last Year Return",
    DailyChange = <any>"Daily Change",
    Name = <any>"Name"
}

export class SheetSortCriteria {
    public static criteria = [
        {id: SheetSortCriteriaEnum.OneMonthReturn, value: 'Last Month Return'},
        {id: SheetSortCriteriaEnum.OneYearReturn, value: 'Last Year Return'},
        {id: SheetSortCriteriaEnum.DailyChange, value: 'Daily Change'},
        {id: SheetSortCriteriaEnum.Name, value: 'Name'}
    ]
}

