import Pagination from '@/ui/Pagination';
import UserFilter from '@/ui/users/Filter';
import UserMobileFilter from '@/ui/users/MobileFilter';
import UserTable from '@/ui/users/Table';

export default function Page() {
  return (
    <>
      <UserMobileFilter />
      <UserFilter />
      <UserTable />
      <Pagination />
    </>
  );
}
