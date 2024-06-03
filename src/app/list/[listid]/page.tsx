'use client'
import React from 'react'
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Units } from '@/app/api/properties/model/types'
import { GET_THING_BY_ID } from '@/app/api/properties/model/ggl'
const UnitInfo = () => {
    const router = useRouter();
    const { listid } = router.query;

    // const { loading, error, data } = useQuery<{ unit: Units }>(GET_THING_BY_ID, {
    //     variables: { id },
    //     skip: !id, // Skip the query until we have an id
    // });

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    // const unit = data?.unit;

    // console.log(unit, " <<<< 21")
    return (
        <div>UnitInfosddfsg</div>
    )
}

export default UnitInfo