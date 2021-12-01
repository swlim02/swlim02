import React, { useRef, useEffect, useState} from "react";
import MaterialTable, { MTableToolbar } from 'material-table';

const TableView = (props) => {
  const [selectData, setSelectData] = useState(props.tableData_o.tableData);
  console.log("TableView");
  console.log(props.tableData_o.tableData);
  console.log(setSelectData);
  console.log(props.callBack);
  props.callBack(setSelectData);
//  useEffect(() => {
//
//  }, []);

  return (
    <div>
    <MaterialTable
      options={{
        toolbar:false,
        paging:false,
        maxBodyHeight: props.height,
        headerStyle: {
          zIndex: 0,
        },
        rowStyle: {
          fontSize: 12.5,
        }
      }}
      columns={[
        { title: 'title', field: 'title' },
        { title: 'genre', field: 'genre' },
        { title: 'creative_type', field: 'creative_type' },
        { title: 'release', field: 'release' },
        { title: 'rating', field: 'rating' },
      ]}
      data={props.tableData_o.tableData}
    />
    </div>
  )

};

export default TableView
