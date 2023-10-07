import { IBreadcrumbItem } from '../models/breadcrumb-item.model';

export const PersonEditionBreadcrumbsConfiguration: IBreadcrumbItem[] = [
  {
    id: 1,
    name: 'Home',
    isActive: false,
    isHome: true,
    routerLink: ['../../..', 'home'],
  },
  {
    id: 2,
    name: 'Person Edition',
    isActive: true,
    isHome: false,
  },
];
