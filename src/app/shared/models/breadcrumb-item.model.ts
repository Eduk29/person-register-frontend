export interface IBreadcrumbItem {
  id: number;
  isActive: boolean;
  isHome: boolean;
  name: string;
  routerLink?: string[];
}
