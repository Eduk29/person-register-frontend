import { IBreadcrumbItem } from '../models/breadcrumb-item.model';

export const personNewBreadcrumbs: IBreadcrumbItem[] = [
  {
    id: 1,
    name: 'Home',
    isActive: false,
    isHome: true,
    routerLink: ['../..', 'home'],
  },
  {
    id: 2,
    name: 'New Person',
    isActive: true,
    isHome: false,
  },
];
