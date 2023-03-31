import { Skeleton } from "@mui/material";
import React from "react";

export default function TableSkeleton (){
    return (
        <React.Fragment>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
        </React.Fragment>
    );
}