export interface SelectOption {
  label: string;
  value: string;
  multiple?: boolean;
  options: {
    label: string;
    value: number | string;
  }[];
}
