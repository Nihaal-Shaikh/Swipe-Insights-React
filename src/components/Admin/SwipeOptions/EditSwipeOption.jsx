import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddSwipeOption from "./AddSwipeOption";
import axios from "axios";

export default function EditSwipeOption() {

    const { id } = useParams();

    const [editData, setEditData] = useState();

    useEffect(() => {
            axios.get(`http://127.0.0.1:8000/api/web-admin/edit-image-status/${id}`)
              .then((response) => {
                setEditData(response.data);
                console.log(`Edit clicked for ID: ${id}`, response.data);
              })
              .catch((error) => {
                console.error('Error fetching edit data:', error);
              });
    }, [id]);

    return (
        <>
            <AddSwipeOption editpage={1} editData={editData} />
        </>
    );
}