interface Sort {
  direction: 'asc' | 'desc';
  field: string;
}

export class SearchParamsDto {
  page: number = 1;
  limit: number = 10;
  search: string = '';
  sort: Sort = {
    direction: 'desc',
    field: 'createdBy',
  };
}
