import { Table } from '@mui/joy';

const Page = () => {
  return (
    <div>
      <span>这是仪表盘页</span>
      <Table>
        <thead>
          <tr>
            <th>表头1</th>
            <th>表头2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>单元格1</td>
            <td>单元格2</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Page;
