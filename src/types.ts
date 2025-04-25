export enum ItemStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum ItemPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface Item {
  id: number;
  name: string;
  description: string;
  status: ItemStatus;
  amount: number;
  priority: ItemPriority;
}
