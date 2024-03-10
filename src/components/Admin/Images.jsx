import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function Images() {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        // Fetch data from Laravel backend
        axios.get('http://127.0.0.1:8000/api/web-admin/images')
            .then(response => {
                setRowData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Ag-Grid column definitions
    const columnDefs = [
        { headerName: 'ID', field: 'id', sortable: true, filter: true },
        { headerName: 'Customer Name', field: 'user.name', sortable: true, filter: true },
        { headerName: 'Image Name', field: 'image_name', sortable: true, filter: true },
        { headerName: 'Image Status', field: 'status.status', sortable: true, filter: true },
        {
            headerName: 'Active', field: 'active', sortable: true, filter: true,
            cellRenderer: (params) => (
                params.value === 0 ? 'No' : 'Yes'
            ),
        },
        {
            headerName: 'Actions', field: 'id', minWidth: 100, maxWidth: 100,
            cellRenderer: (params) => (
                <div className="ag-theme-content-text-center">
                    <span className="icon" style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => editClicked(params.data.id)}>
                        <FaEdit />
                    </span>
                    <span className="icon" style={{ cursor: 'pointer' }} onClick={() => deleteClicked(params.data.id)}>
                        <FaTrash />
                    </span>
                </div>
            ),
        },
    ];

    // Function to handle edit action
    const editClicked = (id) => {
        // Implement your edit logic here
        console.log(`Edit clicked for ID: ${id}`);
    };

    // Function to handle delete action
    const deleteClicked = (id) => {
        // Implement your delete logic here
        console.log(`Delete clicked for ID: ${id}`);
    };

    return (
        <div>
            <p>These are the images</p>
            <Link to='/web-admin' className="underline">Go to dashboard</Link>

            {/* Ag-Grid component */}
            <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    domLayout='autoHeight'
                />
            </div>
        </div>
    );
}
