"use client"
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Container, Card, CardContent, CardMedia, Typography, CardActionArea, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, OutlinedInput, TextField } from '@mui/material';
import { useQuery } from '@apollo/client';
import Link from 'next/link'
import {
  UnitsConnection,
} from "@/app/api/properties/model/types"
import { GET_UNITS } from "@/app/api/properties/model/ggl";
export default function Home() {
  const [after, setAfter] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string | number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minArea, setMinArea] = useState<number | null>(null);
  const [maxArea, setMaxArea] = useState<number | null>(null);
  const [bedroomCount, setBedroomCount] = useState<number | null>(null);

  const { loading, error, data, fetchMore } = useQuery<{ fetchMoreUnits: UnitsConnection }>(GET_UNITS, {
    variables: { limit: 99, after, type, minPrice, maxPrice, minArea, maxArea, bedroomCount },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { edges, pageInfo } = data?.fetchMoreUnits || { edges: [], pageInfo: { endCursor: null, hasNextPage: false } };

  console.log(loading, error)

  const fetching = () => {
    try {
      console.log("<<< 31", { limit: 99, after: null, type, minPrice, maxPrice, minArea, maxArea, bedroomCount })
      fetchMore({ variables: { limit: 99, after: null, type, minPrice, maxPrice, minArea, maxArea, bedroomCount } })

    } catch (error) {
      console.log(error)
    }
  }

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleMinPriceChange = () => { }
  const handleMaxPriceChange = () => { }
  const handleMinAreaChange = () => { }
  const handleMaxAreaChange = () => { }
  const handleAmountBedroomChange = () => { }
  // const handleminPriceChange = () => { }






  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex w-full h-3/6 bg-deepBlue p-4 mb-5">Search</div>

      <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "row", height: '100%', width: '100%' }}>

        <Grid container spacing={2}>
          <Grid item xs={0} md={3} xl={3} sx={{ height: '95%', width: '100%' }}>
            <Box sx={{ bgcolor: '#FFF', height: '100%', width: '80%', padding: '3%' }}>
              <div className='flex flex-col h-[300px]'>
                {/* <FormControl fullWidth> */}

                <Select
                  sx={{ marginTop: '5%', marginBottom: '5%' }}
                  labelId="Main-Type-select-label"
                  id="Type-select"
                  value={type!}
                  label="Type"

                  onChange={handleTypeChange}

                >
                  <MenuItem value={'sell'}>SELL</MenuItem>
                  <MenuItem value={'rent'}>RENT</MenuItem>
                </Select>

                <Select
                  sx={{ marginTop: '5%', marginBottom: '5%' }}
                  labelId="Main-Min-Price-select-label"
                  id="Min-Price-select"
                  value={minPrice!}
                  label="Min-Price"

                  onChange={(e: any) => setMinPrice(e.target.value ? parseFloat(e.target.value) : null)}
                >
                  <MenuItem disabled>Please Select</MenuItem>

                  <MenuItem value={1000000}>1 M</MenuItem>
                  <MenuItem value={1500000}>1.5 M</MenuItem>
                  <MenuItem value={2000000}>2 M</MenuItem>
                  <MenuItem value={2500000}>2.5 M</MenuItem>
                  <MenuItem value={3000000}>3 M</MenuItem>
                  <MenuItem value={3500000}>3.5 M</MenuItem>
                  <MenuItem value={4000000}>4 M</MenuItem>
                  <MenuItem value={4500000}>4.5 M</MenuItem>
                  <MenuItem value={5000000}>5 M</MenuItem>
                  <MenuItem value={5500000}>5.5 M</MenuItem>
                  <MenuItem value={6000000}>6 M</MenuItem>
                  <MenuItem value={6500000}>6.5 M</MenuItem>
                  <MenuItem value={7000000}>7 M</MenuItem>
                  <MenuItem value={7500000}>7.5 M</MenuItem>
                  <MenuItem value={8000000}>8 M</MenuItem>
                  <MenuItem value={8500000}>8.5 M</MenuItem>
                  <MenuItem value={9000000}>9 M</MenuItem>
                  <MenuItem value={9500000}>9.5 M</MenuItem>
                  <MenuItem value={10000000}>10 M</MenuItem>
                  <MenuItem value={15000000}>10.5 M</MenuItem>
                </Select>

                {/* <InputLabel sx={{ marginTop: '5%', marginBottom: '5%' }} id="Main-Max-Price-select-label">Max Price</InputLabel> */}
                <Select
                  sx={{ marginTop: '5%', marginBottom: '5%' }}
                  labelId="Main-Max-Price-select-label"
                  id="Max-Price-select"
                  value={maxPrice!}
                  label="Max Price"
                  variant="outlined"
                  onChange={(e: any) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : null)}
                >
                  <MenuItem disabled>Please Select</MenuItem>
                  <MenuItem value={1000000}>1 M</MenuItem>
                  <MenuItem value={1500000}>1.5 M</MenuItem>
                  <MenuItem value={2000000}>2 M</MenuItem>
                  <MenuItem value={2500000}>2.5 M</MenuItem>
                  <MenuItem value={3000000}>3 M</MenuItem>
                  <MenuItem value={3500000}>3.5 M</MenuItem>
                  <MenuItem value={4000000}>4 M</MenuItem>
                  <MenuItem value={4500000}>4.5 M</MenuItem>
                  <MenuItem value={5000000}>5 M</MenuItem>
                  <MenuItem value={5500000}>5.5 M</MenuItem>
                  <MenuItem value={6000000}>6 M</MenuItem>
                  <MenuItem value={6500000}>6.5 M</MenuItem>
                  <MenuItem value={7000000}>7 M</MenuItem>
                  <MenuItem value={7500000}>7.5 M</MenuItem>
                  <MenuItem value={8000000}>8 M</MenuItem>
                  <MenuItem value={8500000}>8.5 M</MenuItem>
                  <MenuItem value={9000000}>9 M</MenuItem>
                  <MenuItem value={9500000}>9.5 M</MenuItem>
                  <MenuItem value={10000000}>10 M</MenuItem>
                  <MenuItem value={15000000}>10.5 M</MenuItem>
                </Select>
                {/* </FormControl> */}


                <TextField sx={{ marginTop: '5%', marginBottom: '5%' }} id="outlined-basic" label="Min Area" variant="outlined" value={minArea!} onChange={(e: any) => setMinArea(e.target.value ? parseFloat(e.target.value) : null)} />



                <TextField sx={{ marginTop: '5%', marginBottom: '5%' }} id="outlined-basic" label="Max Area" variant="outlined" value={maxArea!} onChange={(e: any) => setMaxArea(e.target.value ? parseFloat(e.target.value) : null)} />


                <TextField sx={{ marginTop: '5%', marginBottom: '5%' }} id="outlined-basic" type="number" label="Bedroom" variant="outlined" value={bedroomCount!} onChange={(e: any) => setBedroomCount(e.target.value ? parseInt(e.target.value) : null)} />


                <Button className='text-black' onClick={fetching}>
                  SEARCH
                </Button>

              </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={9} xl={9}>
            <Box sx={{ bgcolor: '#FFF', height: '90vh', width: '100%', overflowY: 'scroll', padding: '2%', }}>
              <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>

                {edges && edges?.map((item, index) => {

                  console.log(item.node.image, '<<<<<< 99')
                  return (
                    <Grid key={index} item xs={12} md={4} xl={4} sx={{ height: '100%', width: '100%' }}>
                      <Card sx={{ maxWidth: 340, margin: '1%' }}>
                        <CardActionArea>
                          <Link href={`/list/?id=${item.node.id}`}>
                            <CardMedia
                              component="img"
                              height="140"
                              image={`/${item.node.image![0].url}`}
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                {item.node.shortTitle}
                              </Typography>
                              <Typography gutterBottom variant="subtitle1" component="span">
                                {item.node.price?.toFixed(2)} BATH
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.node.shortDescription}
                              </Typography>
                            </CardContent>
                          </Link>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  )
                })}
              </Grid>
              {pageInfo.hasNextPage && (
                <button
                  onClick={() => {
                    fetchMore({
                      variables: { limit: 99, after: pageInfo.endCursor, type, minPrice, maxPrice, minArea, maxArea, bedroomCount },
                    }).then(fetchMoreResult => {
                      setAfter(pageInfo.endCursor);
                    });
                  }}
                >
                  Load More
                </button>
              )}
            </Box>
          </Grid>
        </Grid>

      </Container>





    </main>
  );
}
