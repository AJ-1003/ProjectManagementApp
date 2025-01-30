"use client";
import React from "react";
import { useAppSelector } from "../redux";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utills";
import Header from "@/components/header";
import { useGetTeamsQuery } from "@/state/api";
import Image from "next/image";

const CustomToolbar = () => (
  <GridToolbarContainer className="flex gap-2 toolbar">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
  { field: "projectManagerUsername", headerName: "Project Manager", width: 200 },
  {
      field: "productOwnerProfilePictureUrl",
      headerName: "Product Owner",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-9 h-9">
            <Image
              src={`https://aj-pm-s3-images.s3.us-east-1.amazonaws.com/${params.value}`}
              alt={params.row.username}
              width={100}
              height={50}
              className="rounded-full h-full object-cover"
            />
          </div>
        </div>
      ),
    },
    {
        field: "projectManagerProfilePictureUrl",
        headerName: "Project Manager",
        width: 100,
        renderCell: (params) => (
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-9 h-9">
              <Image
                src={`https://aj-pm-s3-images.s3.us-east-1.amazonaws.com/${params.value}`}
                alt={params.row.username}
                width={100}
                height={50}
                className="rounded-full h-full object-cover"
              />
            </div>
          </div>
        ),
      },
];

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !teams) return <div>Error fetching teams</div>;

  return (
    <div className="flex flex-col p-8 w-full">
      <Header name="Teams" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;