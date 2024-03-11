import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Modal from "../Web/Modal";

export default function ImageStatus() {
    const [rowData, setRowData] = useState([]);
    const dialog = useRef();
	const [delRecId, setDelRecId] = useState(0);
    const [optionDeleted, setOptionDeleted] = useState(false);

    useEffect(() => {
        // Fetch data from Laravel backend
        axios.get('http://127.0.0.1:8000/api/web-admin/image-status')
            .then(response => {
                setRowData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Ag-Grid column definitions
    const columnDefs = [
        { headerName: 'ID', field: 'id', sortable: true, filter: true },
        { headerName: 'Swipe Options', field: 'status', sortable: true, filter: true },
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
                  {params.rowIndex < 2 && (
                    // Render nothing for the first 2 entries
                    <span style={{ display: 'none' }}></span>
                  )}
                  {params.rowIndex >= 2 && (
                    // Render edit and delete icons with flexbox for one-line layout
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Link to={`/web-admin/swipe-options/edit/${params.value}`} title="Edit" className="grid-action-btns text-success link"><FaEdit /></Link>
                      <span className="icon" style={{ cursor: 'pointer' }} onClick={() => deleteClicked(params.data.id)}>
                        <FaTrash />
                      </span>
                    </div>
                  )}
                </div>
              ),
        },
    ];

    // Function to handle delete action
    const deleteClicked = (id) => {

        setDelRecId(id);
        
        if(dialog.current){
            dialog.current.open();
          }
    };

    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/api/web-admin/delete-image-status/${delRecId}`)
          .then((response) => {
            setOptionDeleted((prevOption) => !prevOption);
            console.log('Delete successful');
            // Optionally handle the response or perform any other actions
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
	}

	useEffect(() => {
        // Fetch data from Laravel backend
        axios.get('http://127.0.0.1:8000/api/web-admin/image-status')
            .then(response => {
                setRowData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
	}, [optionDeleted]);

    return (
        <div>
            <Modal ref={dialog} type='confirmDelete' onDelete={handleDelete} />
            <p>These are the statuses</p>
            <Link to='/web-admin' className="underline">Go to dashboard</Link>

            {/* Ag-Grid component */}
            <div className="bg-white shadow-md rounded-md p-4">
                <Link to='/web-admin/swipe-options/add'>Add Swipe Options</Link>
                <div className="ag-theme-alpine">
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        domLayout='autoHeight'
                    />
                </div>
            </div>
        </div>
    );
}
