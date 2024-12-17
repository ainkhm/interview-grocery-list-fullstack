// interface GroceryItem {
//   id: string;
//   name: string;
//   quantity?: number;
//   priority?: number;
//   status?: 'HAVE' | 'RANOUT';
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface GroceryFormItem {
//   name: string;
//   quantity?: number;
// }

export interface GroceryListProps {
  isEditing: boolean;
  openForm: boolean;
}

export enum FieldName {
  Name = 'name',
  Quantity = 'quantity',
  Priority = 'priority',
  Status = 'status',
}

export enum Status {
  RanOut = 'RANOUT',
  Have = 'HAVE',
}
